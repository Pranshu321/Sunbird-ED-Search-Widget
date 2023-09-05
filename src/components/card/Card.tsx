// Import React and CardProps interface from '../../interfaces/interface'
import React from 'react';
import { CardProps } from '../../interfaces/interface';

// Import styled components from '../styled-components/CardElements'
import {
  Container,
  DescType,
  DetailDesc,
  Image,
  ImageDiv,
  Link,
  LowerDiv,
  LowerItem,
  Tags,
  TagsDiv,
  TopContent,
  Type,
} from '../styled-components/CardElements';

// Define a functional component named Card that takes in CardProps as props
export const Card = ({
  name,
  image,
  type,
  subject,
  publisher,
  tags,
  styles,
}: CardProps) => {
  // Return JSX
  return (
    // Use the hidden attribute to conditionally hide the div based on the value of name
    <div hidden={name === ''}>
      {/* Container */}
      <Container style={styles?.container}>
        {/* TopContent */}
        <TopContent style={styles?.headingDiv}>
          <div>
            {/* Link with name as text */}
            <Link style={styles?.heading}>{name}</Link>
            {/* Type with type as text */}
            {type && <Type style={styles?.type}>{type}</Type>}
          </div>
          {/* ImageDiv */}
          <ImageDiv style={styles?.imageDiv}>
            {/* Image with image as src */}
            <Image
              style={styles?.image}
              src={
                image
                  ? image
                  : 'https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
              }
            />
          </ImageDiv>
        </TopContent>
        <div style={{ marginTop: '10px' }}>
          {/* Hide the div if tags array is empty */}
          <div hidden={tags?.length === 0}>
            {/* TagsDiv */}
            <TagsDiv style={styles?.tagsDiv}>
              {/* Render each tag in the tags array */}
              {tags?.map((tag, idx) => (
                <Tags style={styles?.tag} key={idx + 1}>
                  {tag}
                </Tags>
              ))}
            </TagsDiv>
          </div>
          {/* LowerDiv */}
          <LowerDiv style={styles?.LowerDiv}>
            {/* Render subject if it exists */}
            {subject && (
              <LowerItem style={styles?.LowerItem}>
                {/* DescType */}
                <DescType style={styles?.LowerDT}>Subject</DescType>
                {/* DetailDesc */}
                <DetailDesc style={styles?.LowerDD}>{subject}</DetailDesc>
              </LowerItem>
            )}
            {/* Render publisher if it exists */}
            {publisher && (
              <LowerItem style={styles?.LowerItem}>
                {/* DescType */}
                <DescType style={styles?.LowerDT}>Publisher</DescType>
                {/* DetailDesc */}
                <DetailDesc style={styles?.LowerDD}>{publisher}</DetailDesc>
              </LowerItem>
            )}
          </LowerDiv>
        </div>
      </Container>
    </div>
  );
};
