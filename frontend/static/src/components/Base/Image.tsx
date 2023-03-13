import * as images from '../../media';

export type ImageProps = {
  // Must be present in src/media/index.js
  imageKey: string;
  altText: string;
  style?: Object;
  // Add in className?
};

const defaultProps: ImageProps = {
  imageKey: "NBA",
  altText: "",
  style: {}
};

const Image = (props: ImageProps) => {
  return (
    <img
      src={images[props.imageKey]}
      alt={props.altText}
      style={props.style}
    />
  );
};

Image.defaultProps = defaultProps;

export default Image;
