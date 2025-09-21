import { FileUpload } from "~/components/aceternity/file-upload";

export default function QueueDragAndDrop(props: {
  setFiles: (files: File[]) => void;
}) {
  const handleFileUpload = (files: File[]) => {
    props.setFiles(files);
    console.log(files);
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
