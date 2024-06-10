import React, { useState, useEffect } from "react";
import { Container, Heading, VStack, Box, Text, Image, Spinner } from "@chakra-ui/react";
import { FaNewspaper } from "react-icons/fa";

const Index = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch news articles from an API
    fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_NEWS_API_KEY")
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" display="flex" alignItems="center">
          <FaNewspaper style={{ marginRight: "8px" }} />
          News Application
        </Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          news.map((article, index) => (
            <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md" width="100%">
              {article.urlToImage && <Image src={article.urlToImage} alt={article.title} mb={4} borderRadius="md" />}
              <Heading as="h2" size="md" mb={2}>
                {article.title}
              </Heading>
              <Text>{article.description}</Text>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;
