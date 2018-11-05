const renderTemplate = require('./render-template');
const {templatesPath} =  require('../../paths');
const fs = require('fs');

function getImport(imp) {
  const impContent = fs.readFileSync(`${templatesPath}\\imports\\${imp}.js`, `utf-8`);
  return impContent + "\n";
}

module.exports = function(parameters, outputPath) {
  var componentPath = parameters._[2].replace(/\//g, '\\');
  let componentParts = componentPath.split('\\');
  var componentName = componentParts.pop();
  var decorators = "";
  componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

  componentPath = componentPath.toLowerCase();
  let componentPathFinal = `${outputPath}\\${componentPath}\\${componentName}.js`;
  let style = parameters.style;
  let stylePathFinal = `${outputPath}\\${componentPath}\\styles.${style}`;
  var isMobx = parameters.mobx ? true: false;
  var isClass = parameters.class ? "class-": "function-";
  var isPure = parameters.pure ? true: false;
  let isRenderProp = parameters['render-prop'] ? true : false;
  let isHoc = parameters.hoc ? true : false;
  let inheritFrom = parameters.pure ? "React.PureComponent" : "React.Component";
  let inputPath = `${templatesPath}/${isClass}component.js`;
  let theExport = componentName;
  let theExportRenderProp = "";
  let exportStatement = "export default";
  let render = "(null)";


  if(isHoc) {
    theExport = "TheComponent";
  }
  if(isClass === 'function-' && isPure) {
    theExport = renderTemplate(`${templatesPath}\\hof\\pure.js`, {
      "FUNC": theExport
    })
    
  }

  if(isMobx) {
    decorators += "@observer\n";
    if(isClass === 'function-') {
      theExport = renderTemplate(`${templatesPath}\\hof\\observer.js`, {
        "FUNC": theExport
      })
    }

  }

  //theExport += ";";

  if(isRenderProp && isHoc) {
    exportStatement = "export";
    theExportRenderProp = `{${componentName}}`
  }
  if(isRenderProp) {
    render = "props.children()";
    if(isClass === 'class-') {
      render = "this." + render;
    }
  }else if(isHoc) {
    exportStatement = "return ";
    render = `<OldComponent {...${isClass === "class-" ? "this." : ""}props} />`;
  }

console.log(exportStatement);
  let template = renderTemplate(inputPath, {
    'NAMEHERE': isHoc && !isRenderProp ? "TheComponent" : componentName,
    'INHERIT_FROM': inheritFrom,
    'DECORATORS': decorators,
    'EXPORT_STATEMENT': exportStatement,
    'THE_EXPORT': theExportRenderProp ? theExportRenderProp : theExport,
    'RENDER': render,
    
  });

  console.log(template)

  if(isHoc) {
    hoc = renderTemplate(`${templatesPath}\\hoc.js`, {
      'NAMEHERE': componentName, 
      'HOC_CONTENT': template,
      'EXPORT_STATEMENT': "export default",
      "THE_EXPORT" : componentName,
    });

  
  }

  if(isHoc && isRenderProp) {

    render = ` <${componentName}>{(data) => <OldComponent {...${isClass === "class-" ? "this." : ""}props} ${componentName.charAt(0).toLowerCase() + componentName.slice(1)}={data} />}</${componentName}>`

    let template2 = renderTemplate(inputPath, {
      'NAMEHERE': isHoc ? "TheComponent" : componentName,
      'INHERIT_FROM': inheritFrom,
      'DECORATORS': decorators,
      'EXPORT_STATEMENT': 'return ',
      'THE_EXPORT': theExport,
      'RENDER': render,
    });    

    hoc = renderTemplate(`${templatesPath}\\hoc.js`, {
      'NAMEHERE': "with" + componentName, 
      'HOC_CONTENT': template2,
      'EXPORT_STATEMENT': 'export',
      "THE_EXPORT": `{with${componentName}}`
    });
    console.log(template);
    template += "\n\n" + hoc;  
    
    console.log(template);
  } else if(isHoc){
    template = hoc;
  }

  componentPath.split('\\').forEach(dir => {
    if (!fs.existsSync(`${outputPath}\\${dir}`)){
      fs.mkdirSync(`${outputPath}\\${dir}`);
      
    }
    outputPath += `\\${dir}`;
  });

  let theImports = getImport('react');
  if(isMobx) {
    theImports += getImport("mobx");
  }


  if(style === "cssm" || style === "scssm") {
    
    fs.writeFileSync(stylePathFinal, "");
    theImports += getImport(style);
  }
 

  template = theImports + "\n" + template;

  fs.writeFileSync(componentPathFinal, template);
  console.log('DONE!');
}