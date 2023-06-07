import "./ScrollableFeed.css";
import Card from "../Card/Card";
import PropTypes from "prop-types";
import { useState, useEffect, useCallback, useRef } from "react";

function ScrollableFeed(props) {
  const { data, length } = props;
  const [visibleCards, setVisibleCards] = useState([]);

  const handleFetchData = useCallback(() => {
    if (data.length <= length) {
      return setVisibleCards(data);
    }

    const firstVisibleCards = data.splice(0, length);
    setVisibleCards(firstVisibleCards);
  }, [data, length]);

  const handleScroll = useCallback(() => {
    const offsetHeight = document.documentElement.offsetHeight;
    const innerHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;
    const hasReachedBottom = offsetHeight - (innerHeight + scrollTop) <= 10;

    if (hasReachedBottom) {
      const nextCards = data.splice(0, length);
      setVisibleCards((prevState) => [...prevState, ...nextCards]);
    }
  }, [data, length]);

  // We add a ref here to prevent double loading of `useEffect()`
  // Helpful resource: https://www.youtube.com/watch?v=MXSuOR2yRvQ
  const shouldFetch = useRef(true);
  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;
      handleFetchData();
    }

    window.addEventListener("scroll", handleScroll);

    // Returning a clean up method prevents duplicate scroll events
    // Helpful resource: https://react.dev/learn/synchronizing-with-effects#subscribing-to-events
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, length, handleFetchData, handleScroll]);

  return (
    <div className="ScrollableFeed">
      {visibleCards.map((data) => (
        <Card key={data.id} title={data.title} body={data.body}></Card>
      ))}
    </div>
  );
}

ScrollableFeed.propTypes = {
  data: PropTypes.array,
  length: PropTypes.number,
};

export default ScrollableFeed;
