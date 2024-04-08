"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchResult, setSearchResult] = useState([]);

  const [post, setPost] = useState([]);
  
  const filtrPrompt = (searchTxt) => {
    const regex = new RegExp(searchTxt, 'i');
    return post.filter((item) => regex.test(item.creator.name) || regex.test(item.tag) || regex.test(item.prompt));
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);

    setSearchTimeOut( setTimeout(() => {
      const searchResult = filtrPrompt(e.target.value);
      setSearchResult(searchResult);
    }))
  }
  
  const handleTagClick = (tagC) => {
    setSearchText(tagC);
    const searchResult = filtrPrompt(tagC);
    setSearchResult(searchResult);  
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPost(data);
    }
    fetchPosts();
  },[])

  return (
    <section className="feed">
      
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for tag or name" value={searchText} onChange={handleSearchChange} required className="search_input peer"/>
      </form>

      {
        searchText ? (<PromptCardList data={searchResult} handleTagClick={handleTagClick} />) : (<PromptCardList data={post} handleTagClick={handleTagClick} />)
      }
    </section>
  )
}

export default Feed