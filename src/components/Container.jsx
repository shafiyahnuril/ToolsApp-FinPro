import { cn } from '../lib/utils'

function Container({className, children}) {
  return (
    <section
        className={cn(
            `mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8`,
            className
        )}
    >
        {children}
    </section>
  )
}

export default Container