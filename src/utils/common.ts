export const getPagination = ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const limit = size;
  const offset = (page - 1) * size;
  return { offset, limit };
};
