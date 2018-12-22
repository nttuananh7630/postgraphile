import React from "react";
import gql from "graphql-tag";
import { propType } from "graphql-anywhere";
import { Link } from "react-router-dom";
import TopicItem from "./TopicItem";
import PostItem from "./PostItem";
import Main from "./Main";
import NotFound from "./NotFound";
import CreateNewReplyForm from "./CreateNewReplyForm";
import ForumItem from "./ForumItem";
import moment from "moment";

export default class TopicPage extends React.Component {
  static QueryFragment = gql`
    fragment TopicPage_QueryFragment on Query {
      ...CreateNewReplyForm_QueryFragment
      currentUser {
        nodeId
        id
        isAdmin
        ...ForumItem_CurrentUserFragment
      }
      topic: topicById(id: $topic) {
        ...TopicItem_TopicFragment
        createdAt
        forum {
          name
          slug
        }
        posts {
          nodes {
            ...PostItem_PostFragment
          }
        }
      }
    }
    ${TopicItem.TopicFragment}
    ${PostItem.PostFragment}
    ${ForumItem.CurrentUserFragment}
    ${CreateNewReplyForm.QueryFragment}
  `;

  static propTypes = {
    data: propType(TopicPage.QueryFragment),
  };

  render() {
    const { data } = this.props;
    const { loading, error, currentUser, topic } = data;

    if (loading) {
      return <Main>Loading...</Main>;
    }
    if (error) {
      return <Main>Error {error.message}</Main>;
    }
    if (!topic) {
      return <NotFound />;
    }
    return (
      <Main>
        <div className="Forum-header">
          <Link to={`/forums/${topic.forum.slug}/`}>{topic.forum.name}</Link>
        </div>
        <h1 className="Topic-header">{topic.title}</h1>
        <section className="Posts-container">
          <article className="PostItem">
            <div className="PostItem-meta PostItem-user PostItem-user--with-avatar">
              <img
                alt=""
                className="PostItem-avatar"
                src={topic.user.avatarUrl}
              />
              {topic.user.name}
            </div>
            <div>
              <time className="PostItem-date">
                {moment(topic.createdAt).calendar()}
              </time>
              <p className="PostItem-body">{topic.body}</p>
            </div>
          </article>
          {topic.posts.nodes.length ? (
            topic.posts.nodes.map(node => (
              <PostItem
                key={node.nodeId}
                post={node}
                currentUser={currentUser}
              />
            ))
          ) : (
            <div>
              There are no replies yet!{" "}
              {currentUser ? (
                currentUser.isAdmin ? (
                  "Create one below..."
                ) : (
                  "Please check back later or contact an admin."
                )
              ) : (
                <span>
                  Perhaps you need to <Link to="/login">log in</Link>?
                </span>
              )}
            </div>
          )}
        </section>
        {currentUser ? (
          <div>
            <h2>Reply to this topic</h2>
            <CreateNewReplyForm
              data={data}
              onCreatePost={post => {
                // TODO: alter the cache
                data.refetch();
              }}
            />
          </div>
        ) : null}
      </Main>
    );
  }
}
