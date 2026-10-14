/**
 * AppZed contract-reader (managed=true). Extract key terms, dates, and
 * renewal deadlines from contract text for human review. Stateless.
 * Bindings: AI.
 */
const MODEL = "@cf/meta/llama-3.1-8b-instruct-fp8";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/health") {
      return Response.json({ ok: true, solution: "contract-reader" });
    }
    if (request.method === "POST" && url.pathname === "/extract") {
      const body = await request.json().catch(() => null);
      if (!body || !body.contract) return bad("contract text is required.");
      if (body.contract.length > 100000) return bad("Contract exceeds 100KB.");
      let out;
      try {
        out = await env.AI.run(MODEL, {
          messages: [
            { role: "system", content: "Extract from the contract: PARTIES, TERM (start/end), RENEWAL (auto-renew? notice deadline?), KEY AMOUNTS, TERMINATION terms, and RED FLAGS worth a lawyer's look. Head each section exactly as named. If a section is absent, write 'not stated'." },
            { role: "user", content: body.contract.slice(0, 12000) },
          ],
          max_tokens: 768,
        });
      } catch (err) {
        return Response.json({ error: String((err && err.message) || err) }, { status: 502 });
      }
      return Response.json({ terms: out.response || "" }, { status: 201 });
    }
    return new Response("Not found", { status: 404 });
  },
};

function bad(message) {
  return Response.json({ error: message }, { status: 400 });
}
