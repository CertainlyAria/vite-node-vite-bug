import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    plugins: [react(), vike({ prerender: true })],
    resolve: {
        alias: {
            "#": path.resolve(__dirname, "src"),
        },
    },
    ssr: {
        noExternal: [
            "@mui/material",
            "@mui/utils",
            "@mui/base",
            "@mui/icons-material",
        ],
    },
};

export default config;
