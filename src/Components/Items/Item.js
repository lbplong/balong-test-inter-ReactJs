import { faHeart as farHeart } from "@fortawesome/fontawesome-free-solid";
import { faHeart } from "@fortawesome/fontawesome-free-regular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Button, Badge, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import "./Item.scss";
import LikeAPI from "../../API/ModuleAPI/LikeAPI";
import PostAPI from "../../API/ModuleAPI/PostAPI";
import * as PostAction from "../../Redux/Actions/PostActions";

const Item = (props) => {
  const [likeModel, setLikeModel] = useState({});
  const [likeChange, setLikeChange] = useState(false);
  useEffect(() => {
    getLikeObject();
    // eslint-disable-next-line
  }, [props.item]);

  useEffect(() => {
    if (likeChange) {
      updateTotalLike();
    }
    // eslint-disable-next-line
  }, [likeModel]);
  const getLikeObject = async () => {
    const params = {
      token: localStorage.token,
      accountId: props.account.id,
      postId: props.item.id,
    };
    const likeModel = await LikeAPI.getModel(params);
    setLikeModel(likeModel.likedDTO);
  };
  const voteAction = () => {
    if (likeModel.liked >= 3) {
      window.alert("You had given 3 votes for this item!");
    } else {
      updateLikedModel();
    }
  };
  const updateLikedModel = async () => {
    const params = {
      token: localStorage.token,
      accountId: props.account.id,
      postId: props.item.id,
      liked: likeModel.liked + 1,
    };
    setLikeChange(true);
    const likeResponse = await LikeAPI.addLike(params, likeModel.id);
    setLikeModel(likeResponse.likedDTO);
  };
  const updateTotalLike = async () => {
    const params = {
      token: localStorage.token,
      liked: props.item.liked + 1,
    };

    const postResponse = await PostAPI.updatePostLike(params, props.item.id);

    props.updatePostTotalLike(props.listItems, postResponse.listItems[0]);
    setLikeChange(false);
  };
  return (
    <div className="item-wrapper">
      <Card>
        <Card.Header>
          <Card.Title>
            {props.item.title.length > 25
              ? props.item.title.substring(0, 25) + "..."
              : props.item.title}
          </Card.Title>
          <Badge bg="">{props.item.liked}k</Badge>
          <Button variant="" className="btn-like" onClick={voteAction}>
            {likeModel && likeModel.liked > 0 ? (
              <FontAwesomeIcon icon={farHeart} />
            ) : (
              <FontAwesomeIcon icon={faHeart} />
            )}
            {` ${likeModel.liked}`}
          </Button>
        </Card.Header>
        <Card.Body>
          <Image src={props.item.video} thumbnail />
        </Card.Body>
        <Card.Footer className="text-muted">
          {new Date(props.item.dateUpLoad).getFullYear() +
            "-" +
            (new Date(props.item.dateUpLoad).getMonth() + 1) +
            "-" +
            (new Date(props.item.dateUpLoad).getDate() < 10
              ? "0" + new Date(props.item.dateUpLoad).getDate()
              : new Date(props.item.dateUpLoad).getDate())}
        </Card.Footer>
      </Card>
    </div>
  );
};
const mapInProps = (state) => {
  return {
    account: state.AccountReducer,
    listItems: state.PostReducer,
  };
};
const dispatchToProps = (dispatch) => {
  return {
    updatePostTotalLike: (listItems, postUpdate) => {
      dispatch(PostAction.updatePostTotalLike(listItems, postUpdate));
    },
  };
};
export default connect(mapInProps, dispatchToProps)(Item);
