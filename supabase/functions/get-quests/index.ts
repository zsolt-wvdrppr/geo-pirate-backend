import "@supabase/functions-js/edge-runtime";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types.ts";
import BadRequestError from "../errors/BadRequestError.ts";
import NotFoundError from "../errors/NotFoundError.ts";
import AppError from "../errors/AppError.ts";
import { ConflictError } from "npm:openai@^4.52.5";

const env = Deno.env.get("ENV");
const SUPABASE_URL = env === "DEVELOPMENT"
  ? (Deno.env.get("REMOTE_SUPABASE_URL") ?? "")
  : (Deno.env.get("SUPABASE_URL") ?? "");
const SUPABASE_SERVICE_ROLE_KEY = env === "DEVELOPMENT"
  ? (Deno.env.get("REMOTE_SUPABASE_SERVICE_ROLE_KEY") ?? "")
  : (Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");

const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
);

type ReqDataType = "quest_list" | "quest_info" | "quest_clues";
type QuestIdType = number;
type ReqBodyType = {
  data_type: ReqDataType;
  quest_id?: number | null;
  user_id?: string | null;
};
type ErrorTypes = AppError | BadRequestError | ConflictError | NotFoundError;

const getQuestList = async () => {
  const { data, error } = await supabase
    .from("quests")
    .select(
      "quest_id,icon,title,difficulty,quest_start_location,est_completion_time",
    );

  return { data, error, dataType: "quest_list" as const };
};

const getQuestInfoByQuestId = async (questId: QuestIdType) => {
  if (!Number(questId)) {
    throw new BadRequestError(`Incorrect quest_id format '${questId}'`);
  }

  const { data, error } = await supabase
    .from("quests")
    .select()
    .eq("quest_id", questId);

  if (data?.length === 0) {
    throw new NotFoundError(`Quest not foud by id: ${questId}!`);
  }

  return { data, error, dataType: "quest_info" as const };
};

const dataTypeSelector = async (body: ReqBodyType) => {
  const {
    data_type: dataType,
    quest_id: questId = null,
  } = body;

  if (!dataType) {
    throw new BadRequestError("Missing data_type in request body!");
  }

  switch (dataType) {
    case "quest_list":
      return await getQuestList();
    case "quest_info":
      if (!questId) {
        throw new BadRequestError("Missing quest_id in request body!");
      }
      return await getQuestInfoByQuestId(questId);
    default:
      throw new BadRequestError("Incorrect data type in request body!");
  }
};

Deno.serve(async (req: Request) => {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      throw new BadRequestError("Invalid or missing request body!");
    }

    const { data, error, dataType } = await dataTypeSelector(body);
    if (error) throw new Error(error.message);

    return new Response(JSON.stringify({ [dataType]: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const status = error instanceof AppError ? error.status : 500;
    const message = error instanceof Error
      ? error.message
      : "Internal server error";

    return new Response(JSON.stringify({ error: message }), {
      status: status || 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/get-quests' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
