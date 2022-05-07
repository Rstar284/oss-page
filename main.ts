import {
    Application,
    Context,
    Router,
} from "https://deno.land/x/oak@v10.2.0/mod.ts";

const app    = new Application();
const router = new Router();

router.get("/", (ctx: Context) => {
    const agent = ctx.request.headers.get("user-agent");

    if (!agent)
        return;

    ctx.response.body =
        agent.split(/[\s+|\/]/g).includes("Firefox")
            ? "Ooh you use firefox, or atleast appear to, \
(smh to those who changed their user-agent), anyway you deserve a cookie"
            : "Please for all purposes and reasons, switch to Firefox for your \
daily usage. As you are not currently using Firefox, we cannot serve you \
this page, for this server only serves OSS consumers";

    ctx.response.headers.set("Refresh",
                             "4;https://www.youtube.com/watch?v=dQw4w9WgXcQ");
})

app.addEventListener(
    "listen",
    ({hostname,
      port}) => { console.log(`Listening on: ${hostname}:${port}`); });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port : 8080});
