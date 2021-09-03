import React from "react";
import Container from "@material-ui/core/Container";
import styles from "./PageContent.module.scss";
import Typography from "@material-ui/core/Typography";

const PageContent = () =>{
    return (
      <Container className={`${styles.page_content}`} maxWidth="lg">
      </Container>
    );
};

export default PageContent;