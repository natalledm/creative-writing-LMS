import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editDocument, readDocument } from "../scripts/fireStoreDB";
import { uploadFile } from "../scripts/cloudStorage";

export default function EditCoursePage() {
  const { courseId } = useParams();

  const [course, setCourse] = useState({});

  const [description, setDescription] = useState("");
  const [link, setLink] = useState({ link: "" });
  const [file, setFile] = useState({ name: "" });

  const [isRefreshNedded, setIsRefreshNeeded] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    async function loadCourse(courseId) {
      const courseDB = await readDocument("courses", courseId);
      setCourse(courseDB);
      setDescription(courseDB.description);
      setIsRefreshNeeded(false);
    }
    loadCourse(courseId);
  }, [courseId, isRefreshNedded]);

  async function onSubmit(event) {
    event.preventDefault();

    const fileUrl = await uploadFile(`courses/${courseId}/${file.name}`, file);

    const newData = {
      description: description,
      links: [
        {
          linkUrl: link,
        },
      ],
      files: [
        {
          fileName: file.name,
          url: fileUrl,
        },
      ],
    };

    try {
      await editDocument("courses", newData, courseId);
      setIsRefreshNeeded(true);
      setIsSuccessful(true);
    } catch (error) {
      console.log(error);
      setIsRefreshNeeded(false);
      setIsSuccessful(false);
    }
  }

  function addFile(file) {
    const SIZE_LIMIT = 10 * 1024 * 1024;
    if (file.size > SIZE_LIMIT) {
      alert("File is bigger than 10mb, please choose a smaller file");
      return;
    }
    setFile(file);
  }

  function onFileChange(event) {
    event.preventDefault();
    addFile(event.target.files[0]);
  }

  return (
    <div>
      <h2>Edit {courseId} course:</h2>
      {isSuccessful ? <h3>Course updated!</h3> : null}
      <form onSubmit={onSubmit}>
        <label>
          Description:
          <input
            type="textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label>
          File to upload:
          <input type="file" name={file.name} onChange={onFileChange} />
        </label>
        <label>
          <input
            type="text"
            placeholder="Link to add"
            onChange={(event) => setLink(event.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
