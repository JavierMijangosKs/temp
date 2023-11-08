import React, { useMemo } from "react";
import "./PostItem.css";
import { Card, Typography } from "antd";
import { getAverage } from "./utils";
import { TagStar } from "./TagStar";

const { Text } = Typography;

export const PostItem = ({ post, isSelected, readOnly = false, onClick }) => {
  const { picUrl, title, ratings } = post;

  const average = useMemo(() => {
    return getAverage(ratings);
  }, [ratings]);

  return (
    <div>
      <Card
        onClick={onClick}
        hoverable={!readOnly}
        cover={<img alt={picUrl} src={picUrl} />}
        className={`postCard ${isSelected && !readOnly && "selectedCard"}`}
      >
        <div className="cardDesc">
          <Text strong>{title}</Text>
          {ratings.length ? <TagStar score={average} /> : null}
        </div>
      </Card>
    </div>
  );
};
