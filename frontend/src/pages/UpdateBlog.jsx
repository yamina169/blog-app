import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  updateBlogStart,
  updateBlogFailure,
  updateBlogSuccess,
} from "../features/blogSlice";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogId } = useParams();

  const { user } = useSelector((state) => state.userSliceApp);
  const { theme } = useSelector((state) => state.themeSliceApp);

  const [blogImage, setBlogImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({});

  const blogImgChangeHandle = (e) => {
    const file = e.target.files[0];
    setBlogImage(file);

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

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`/api/blog/get-all-blogs?blogId=${blogId}`);
      if (res.status === 200) {
        const blog = res.data.blogs[0];
        if (blog) setFormData(blog);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [blogId]);

  const updateBlogPost = async (e) => {
    e.preventDefault();

    if (!formData.blogTitle) {
      toast.error("Blog title is required!");
      return;
    }
    if (!formData.blogBody || formData.blogBody.length < 20) {
      toast.error("Post body must be at least 20 characters!");
      return;
    }

    try {
      dispatch(updateBlogStart());

      const data = new FormData();
      data.append("blogTitle", formData.blogTitle);
      data.append("blogBody", formData.blogBody);
      data.append("blogCategory", formData.blogCategory || "");
      if (blogImage) data.append("blogImage", blogImage);

      const res = await axios.put(
        `/api/blog/update-blog/${blogId}/${user._id}`,
        data,
        {
          headers: {
            Authorization: user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        dispatch(updateBlogSuccess(res.data.blog));
        toast.success("Blog updated successfully!");
        navigate(`/blog/${res.data.blog.slug}`);
      }
    } catch (err) {
      dispatch(updateBlogFailure(err.message));
      console.error(err.message);
      toast.error("Failed to update blog.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex w-full items-center flex-col">
        <h1 className="text-3xl py-5 text-violet-500 font-semibold">
          Update Blog
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
              value={formData.blogTitle || ""}
              onChange={inputChangeHandle}
            />

            <select
              className={`outline-none py-2 rounded-md px-5 border ${
                theme === "dark" && "bg-gray-700 border-gray-500"
              }`}
              name="blogCategory"
              value={formData.blogCategory || ""}
              onChange={inputChangeHandle}
            >
              <option disabled>Select Category</option>
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
                className="h-96 object-cover rounded-md w-full"
              />
            </div>
          )}

          <div className="my-5">
            <ReactQuill
              className="h-72"
              onChange={reactQuillChange}
              value={formData.blogBody || ""}
            />
          </div>

          <button
            type="submit"
            className="bg-gray-700 text-white font-semibold active:bg-gray-800 py-2 rounded-md my-5"
            onClick={updateBlogPost}
          >
            Update Changes
          </button>
        </form>
      </div>
      <Toaster />
    </>
  );
};

export default UpdateBlog;
