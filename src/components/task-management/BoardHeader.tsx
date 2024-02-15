interface BoardHeaderProps {
  epicName: string
  boardName: string
}

export const BoardHeader = (props: BoardHeaderProps) => {
  const { epicName, boardName } = props

  return (
    <div className='px-4 py-3 bg-[#262626]/70 shadow-md'>
      <h3 className='font-semibold'>
        # {epicName} / {boardName}
      </h3>
    </div>
  )
}
