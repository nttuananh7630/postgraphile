import React from "react";
import gql from "graphql-tag";
import { propType } from "graphql-anywhere";
import { Link } from "react-router-dom";

export default class ForumItem extends React.Component {
  static ForumFragment = gql`
    fragment ForumItem_ForumFragment on Forum {
      nodeId
      id
      name
      description
      slug
    }
  `;

  static CurrentUserFragment = gql`
    fragment ForumItem_CurrentUserFragment on User {
      nodeId
      isAdmin
    }
  `;

  static propTypes = {
    forum: propType(ForumItem.ForumFragment),
    currentUser: propType(ForumItem.CurrentUserFragment),
  };

  render() {
    const { forum, currentUser } = this.props;
    return (
      <div className="ForumItem">
        <h1 className="ForumItem-name">
          <Link to={`/forums/${forum.slug}`}>{forum.name}</Link>
        </h1>
        {forum.description && (
          <div className="ForumItem-description">{forum.description}</div>
        )}
        {currentUser && currentUser.isAdmin ? (
          <div className="ForumItem-tools">[edit]</div>
        ) : null}
      </div>
    );
  }
}
