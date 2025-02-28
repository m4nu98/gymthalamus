interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className="flex justify-center w-full">
      <div className="container grid gap-12 md:gap-8 max-w-6xl">
        {children}
      </div>
    </div>
  )
}

