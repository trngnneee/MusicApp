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

const collectAllChild = (node) => {
  let ids = [node.id];
  for (const child of node.children)
  {
    ids = ids.concat(collectAllChild(child));
  }
  return ids;
}

module.exports.collectAllChild = collectAllChild

const findNode = (tree, targetID) => {
  for (const node of tree)
  {
    if (node.id == targetID)
    {
      return node;
    }
    if (node.children && node.children.length > 0) 
    {
      const targetFound = findNode(node.children, targetID);
      if (targetFound)
        return targetFound;
    }
  }
  return null;
}

module.exports.findNode = findNode;