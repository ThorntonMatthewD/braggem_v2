export type ImageProps = {
  fileName: string;
  altText: string;
  // className
  // dimensions
}

const Image = (props: ImageProps) => {
  const getImageUrl = () => new URL(`../../media/${props.fileName}`, import.meta.url).href;

  return (
    <img
      src={getImageUrl()}
      alt={props.altText}
    />
  );
};

export default Image;
