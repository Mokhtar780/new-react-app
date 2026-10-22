import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("app/welcome", "routes/welcome/welcome.tsx"),
    route("app/welcome/details/:id", "routes/welcome/details.tsx"),
] satisfies RouteConfig;
