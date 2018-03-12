const deepCopy = (source) =>
{
	return JSON.parse(JSON.stringify(source));
};

export default
{
	deepCopy
};
