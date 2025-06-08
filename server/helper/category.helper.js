const categoryTreeBuild = (categoryList, parentId="") => {
  const tree = [];

  categoryList.forEach((item) => {
    if (item.parent == parentId) {
      const children = categoryTreeBuild(categoryList, item.id);

      tree.push({
        id: item.id,
        name: item.name,
        children: children
      })
    }
  })

  return tree;
}

module.exports.categoryTreeBuild = categoryTreeBuild;