import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addBlogStart,
  addBlogFailure,
  addBlogSuccess,
} from "../features/blogSlice";

const CreateBlog = () => {
  const { user } = useSelector((state) => state.userSliceApp);
  const { theme } = useSelector((state) => state.themeSliceApp);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [blogImage, setBlogImage] = useState(null); // local image file
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    user: user,
  });

  const blogImgChangeHandle = (e) => {
    const file = e.target.files[0];
    setBlogImage(file);

    // show preview
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const inputChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const reactQuillChange = (e) => {
    setFormData({
      ...formData,
      blogBody: e,
    });
  };

  const publishBlogBtn = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.blogTitle) {
      toast.error("Blog title is required!");
      return;
    }
    if (!formData.blogBody || formData.blogBody.length < 20) {
      toast.error("Post body must be at least 20 characters!");
      return;
    }

    try {
      dispatch(addBlogStart());

      // Prepare form data (for file upload if needed)
      const data = new FormData();
      data.append("blogTitle", formData.blogTitle);
      data.append("blogBody", formData.blogBody);
      data.append("blogCategory", formData.blogCategory || "");
      if (blogImage) {
        data.append("blogImage", blogImage); // send file to backend
      }

      const response = await axios.post("/api/blog/post-blog", data, {
        headers: {
          Authorization: user.token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        dispatch(addBlogSuccess(response.data.blog));
        navigate(`/blog/${response.data.blog.slug}`);
        toast.success("Blog published successfully!");
      }
    } catch (error) {
      dispatch(addBlogFailure(error));
      console.error(error);
      toast.error("Failed to publish blog.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex w-full items-center flex-col">
        <h1 className="text-3xl py-5 text-violet-500 font-semibold">
          Create Blog
        </h1>

        <form className="flex flex-col w-10/12 gap-5">
          <div className="flex gap-5">
            <input
              type="text"
              placeholder="Blog Title"
              className={`py-2 rounded-md px-3 border outline-none w-full ${
                theme === "dark" && "bg-gray-700 border-gray-500"
              }`}
              name="blogTitle"
              onChange={inputChangeHandle}
            />

            <select
              defaultValue={"Select category"}
              className={`outline-none py-2 rounded-md px-5 border ${
                theme === "dark" && "bg-gray-700 border-gray-500"
              }`}
              name="blogCategory"
              onChange={inputChangeHandle}
            >
              <option>Select Category</option>
              <option>Java</option>
              <option>Javascript</option>
              <option>React Js</option>
              <option>Git</option>
              <option>Mongo DB</option>
            </select>
          </div>

          <div className="flex items-center border-2 border-dotted py-2 px-3 border-violet-500">
            <input
              type="file"
              accept="image/*"
              onChange={blogImgChangeHandle}
            />
          </div>

          {imagePreview && (
            <div className="w-full flex justify-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded-md w-full bg-cover h-96 object-cover bg-center"
              />
            </div>
          )}

          <div className="my-5">
            <ReactQuill className="h-72" onChange={reactQuillChange} />
          </div>

          <button
            type="submit"
            className="bg-gray-700 text-white font-semibold active:bg-gray-800 py-2 rounded-md my-5"
            onClick={publishBlogBtn}
          >
            Publish Blog
          </button>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default CreateBlog;
