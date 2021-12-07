import "./ListItems.scss";
import Item from "../Items/Item";
import { connect } from "react-redux";
import { Button, Spinner } from "react-bootstrap";
import * as PostAction from "../../Redux/Actions/PostActions";
import * as PagingAction from "../../Redux/Actions/PagingActions";
import PostAPI from "../../API/ModuleAPI/PostAPI";
import { useEffect, useState } from "react";

const ListItems = (props) => {
  const [notFullList, setNotFullList] = useState(true);
  const [isLoadingProcess, setIsLoadingProcess] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [isLoadingClass, setIsLoadingClass] = useState("");
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    getListDefault();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getListDefault();
    setIsBottom(false);
    setNotFullList(true);
    setIsLoadingClass(false);
    document.getElementById("list-item").scrollTo(0, 0);
    // eslint-disable-next-line
  }, [props.nowDate]);

  useEffect(() => {
    if (props.listItems.length > 0 && props.listItems.length >= totalPage) {
      setNotFullList(false);
    }
    // eslint-disable-next-line
  }, [props.paging]);

  useEffect(() => {
    if (isBottom && notFullList) {
      lazyLoading();
    }
    // eslint-disable-next-line
  }, [isBottom]);
  useEffect(() => {
    if (isLoadingProcess) {
      acceptLoading();
      setIsBottom(false);
    }
    // eslint-disable-next-line
  }, [isLoadingProcess]);

  const getListDefault = async () => {
    try {
      const params = { dateS: props.nowDate, token: localStorage.token };
      const totalPage = await PostAPI.getTotalPage(params);
      setTotalPage(totalPage);
    } catch (error) {}
    props.getDefaultListItems(props.nowDate, 0, 3, localStorage.token);
    props.setPaging(0);
  };

  const lazyLoading = () => {
    setIsLoadingProcess(true);
  };

  const acceptLoading = () => {
    setIsLoadingClass("d-flex");
    setTimeout(() => {
      props.fetchListItem(
        props.nowDate,
        props.paging + 1,
        3,
        localStorage.token,
        props.listItems
      );
      props.setPaging(props.paging + 1);
      setIsLoadingClass("");
      setIsLoadingProcess(false);
    }, 5000);
  };

  const checkEndOfView = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  return (
    <div
      className="list-items-wrapper"
      id="list-item"
      onScroll={checkEndOfView}
    >
      {props.listItems.map((item, key) => {
        return <Item key={key} item={item} />;
      })}
      <div className={`lz-loading ${isLoadingClass}`}>
        <Button variant="primary" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      </div>
    </div>
  );
};
const mapInProps = (state) => {
  return {
    listItems: state.PostReducer,
    nowDate: state.TimeReducer,
    paging: state.PagingReducer,
  };
};
const dispatchToProps = (dispatch) => {
  return {
    getDefaultListItems: (date, page, amount, token) => {
      dispatch(PostAction.getListItemsDefault(date, page, amount, token));
    },
    fetchListItem: (date, page, amount, token, listCurrentItem) => {
      dispatch(
        PostAction.fetchListItem(date, page, amount, token, listCurrentItem)
      );
    },
    setPaging: (page) => {
      dispatch(PagingAction.setPaging(page));
    },
  };
};
export default connect(mapInProps, dispatchToProps)(ListItems);
