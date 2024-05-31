import { getNotes } from '@/app/actions/budio'

export default async function VoidPage() {
  const { data } = await getNotes()

  return (
    <div className="mt-10 columns-1 gap-5 sm:columns-2 md:columns-3 lg:columns-4">
      {data.notes.map((note, i) => (
        <div
          key={`hi_note_${note.id}_${i}`}
          className="hover:searchbar-shadow relative mb-5 flex cursor-pointer break-inside-avoid flex-col gap-3 rounded-lg bg-card p-5 duration-150"
        >
          {/* note title */}
          <div>
            {note.title && (
              <h3 className="text-xl font-bold">
                {note.title.length > 30
                  ? `${note.title.slice(0, 30)}...`
                  : note.title}
              </h3>
            )}
          </div>

          {/* note body */}
          <span>
            {note.body.length > 80 ? `${note.body.slice(0, 80)}...` : note.body}
          </span>
        </div>
      ))}
    </div>
  )
}
