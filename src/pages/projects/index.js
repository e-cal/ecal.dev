import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { portfolio, meta } from "../../content";

export const Projects = () => {
  return (
    <HelmetProvider>
      <Container className="About-header">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Projects | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Projects </h1>{" "}
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="mb-5 po_items_ho">
          {portfolio.map((data, i) => {
            return (
              <div key={i} className="po_item">
                <img
                  src={process.env.PUBLIC_URL + "/images/" + data.img}
                  alt=""
                />
                <div className="content">
                  <h1>{data.title}</h1>
                  <p>{data.description}</p>
                  <div>
                    {data.paper ? <a href={data.paper}>paper</a> : null}
                    {data.code ? <a href={data.code}>code</a> : null}
                    {data.site ? <a href={data.site}>site</a> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </HelmetProvider>
  );
};
