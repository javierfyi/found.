"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CopyButton } from "@/components/copy-button"
import type { ApiReferenceEntry } from "@/lib/components-data"

export function InstallationSection({
  name,
  installCommand,
  dependencies,
  sourceCode,
}: {
  name: string
  installCommand: string
  dependencies?: string[]
  sourceCode?: string | null
}) {
  return (
    <div className="mt-16">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">Installation</h2>
      <Tabs defaultValue="command" className="w-full">
        <TabsList>
          <TabsTrigger value="command">Command</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="command" className="mt-6">
          <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-2">
            <code className="flex-1 text-sm text-muted-foreground">{installCommand}</code>
            <CopyButton value={installCommand} />
          </div>
        </TabsContent>

        <TabsContent value="manual" className="mt-6 space-y-6">
          {dependencies && dependencies.length > 0 && (
            <div className="flex gap-4">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-sm font-medium">
                1
              </div>
              <div className="flex-1">
                <p className="mb-3 text-sm font-medium">Install the following dependencies:</p>
                <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-2">
                  <code className="flex-1 text-sm text-muted-foreground">
                    pnpm add {dependencies.join(" ")}
                  </code>
                  <CopyButton value={`pnpm add ${dependencies.join(" ")}`} />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-sm font-medium">
              {dependencies && dependencies.length > 0 ? 2 : 1}
            </div>
            <div className="flex-1">
              <p className="mb-3 text-sm font-medium">Copy and paste the following code into your project.</p>
              {sourceCode ? (
                <div className="relative rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border px-4 py-2">
                    <span className="text-sm text-muted-foreground">
                      components/{name}.tsx
                    </span>
                    <CopyButton value={sourceCode} />
                  </div>
                  <pre className="max-h-[300px] overflow-auto p-4">
                    <code className="text-sm text-foreground">{sourceCode}</code>
                  </pre>
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-card p-4 text-center">
                  <p className="text-sm text-muted-foreground">Loading source code...</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card text-sm font-medium">
              {dependencies && dependencies.length > 0 ? 3 : 2}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Update the import paths to match your project setup.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function ApiReferenceSection({ entries }: { entries: ApiReferenceEntry[] }) {
  return (
    <div className="mt-16">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight">API Reference</h2>
      <div className="space-y-10">
        {entries.map((entry) => (
          <div key={entry.name}>
            <h3 className="mb-2 text-lg font-semibold">{entry.name}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{entry.description}</p>
            {entry.props.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead className="hidden sm:table-cell">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entry.props.map((prop) => (
                    <TableRow key={prop.name}>
                      <TableCell>
                        <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium">{prop.name}</code>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs text-muted-foreground">{prop.type}</code>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs text-muted-foreground">{prop.default}</code>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {prop.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">
                This component does not accept any props.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function KeepInMindSection() {
  return (
    <div className="mt-16">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Keep in mind
      </h2>
      <p className="max-w-2xl text-base text-foreground">
        Most components here are recreations of the best out there. I don&apos;t
        claim to be the original creator. This is my attempt to reverse-engineer,
        replicate, and often add a few extra features. I&apos;ve tried to credit
        everyone, but if I missed something, let me know.
      </p>
    </div>
  )
}

export function ComponentContactSection() {
  return (
    <div className="mt-12">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Contact
      </h2>
      <p className="text-base text-foreground">
        If you find any bug or issue, feel free to{" "}
        <a
          href="mailto:hello@euler.fyi"
          className="font-medium underline underline-offset-4 transition-colors hover:text-muted-foreground"
        >
          hello@euler.fyi
        </a>
        {" "}Drop a dm.
      </p>
    </div>
  )
}
