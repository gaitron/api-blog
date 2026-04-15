"use client";

import { useEffect, useRef } from "react";
import "swagger-ui-dist/swagger-ui.css";

export default function DocsPage() {
  const swaggerContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ui: any;

    async function loadSwagger() {
      if (!swaggerContainer.current) return;

      const bundleModule = await import("swagger-ui-dist/swagger-ui-bundle");
      const presetModule = await import("swagger-ui-dist/swagger-ui-standalone-preset");

      const SwaggerUIBundle = (bundleModule as any).default ?? bundleModule;
      const SwaggerUIStandalonePreset = (presetModule as any).default ?? presetModule;

      ui = SwaggerUIBundle({
        url: "/openapi.yaml",
        domNode: swaggerContainer.current,
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        layout: "BaseLayout",
        docExpansion: "none",
        defaultModelsExpandDepth: -1,
      });
    }

    loadSwagger();

    return () => {
      if (ui && typeof ui.destroy === "function") {
        ui.destroy();
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-10">
      <div className="mx-auto w-full max-w-7xl rounded-[28px] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="mb-6 border-b border-zinc-200 pb-5">
          <h1 className="text-3xl font-semibold text-zinc-950">Swagger UI</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Visualize a especificação OpenAPI dos endpoints CRUD em tempo real.
          </p>
        </div>

        <div ref={swaggerContainer} className="prose max-w-none" />
      </div>
    </main>
  );
}
