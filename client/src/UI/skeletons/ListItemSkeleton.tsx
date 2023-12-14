import ContentLoader from "react-content-loader";

const ListItemSkeleton = () => {
  return (
    <ContentLoader speed={2} width="100%" height={50} backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
      <rect x="0" y="0" rx="10" ry="10" width="100%" height="50" />
    </ContentLoader>
  );
};

export default ListItemSkeleton;
