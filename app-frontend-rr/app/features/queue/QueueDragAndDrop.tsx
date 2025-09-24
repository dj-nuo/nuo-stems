import { DragAndDrop } from "~/components/nuo/DragAndDrop";

export default function QueueDragAndDrop(props: {
  onChange: (files: File[]) => void;
}) {
  const onChange = (files: File[]) => {
    props.onChange(files);
    console.log(files);
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      <DragAndDrop onChange={onChange} />
    </div>
  );
}
