import { BoardContainer } from '@/components/task-management/BoardContainer'

const BoardIdPage = ({
  params,
}: {
  params: { epicId: string; boardId: string }
}) => {
  const { epicId, boardId } = params

  return <BoardContainer epicId={epicId} boardId={boardId} />
}

export default BoardIdPage
