import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from "../components/seo"
import { Wrapper } from "../styles/indexStyle"

const IndexPage = (props) => {
  const postList = props.data.allMarkdownRemark;
  return (
    <Layout>
      <SEO title="Blog"/>

      <Wrapper>
        
        {postList.edges.map(({ node }, i) => (
          <Link to={node.fields.slug} className="link" key={i}>
            <div className="post-list">
              <h2>{node.frontmatter.title}</h2>
              <small>{node.frontmatter.date}</small>
              <p>{node.frontmatter.description}</p>
            </div>
          </Link>
        ))}

      </Wrapper>

    </Layout>
  )
}

export default IndexPage;

export const listQuery = graphql`
  query ListQuery {
    allMarkdownRemark(
      filter: { frontmatter: { title: { ne: "" } } }
      sort: { fields: [frontmatter___date] order: [DESC]
      }
      ) {
      edges {
        node {
          fields{
            slug
          }
          frontmatter {
            date(formatString: "MMMM Do, YYYY")
            title
            description
          }
        }
      }
    }
  }
`