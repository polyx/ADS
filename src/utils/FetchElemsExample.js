import React from 'react';
import ReactDOM from 'react-dom';
// import {baseUrl} from './App.js';

const baseUrl = 'https://play.dhis2.org/demo/api';

// The following function loads data elements from the API
// It takes one parameter - the page number. If no page number is specified, 1 is used by default
function LoadDataElements(page = 1) {
  // Change this if you want to use a different server (for example https://play.dhis2.org/demo/api)
  //const baseUrl = 'http://localhost:8080/dhis/api';
  //const baseUrl = 'https://play.dhis2.org/demo/api';
  
  // Request one page of data elements from the DHIS API using fetch
  // Fetch returns a Promise that resolves to a Response object after the request has completed
  fetch(`${baseUrl}/dataElements?fields=id,displayName,href&page=${page}`, {
    // headers: {
    //   // Change the next line if your username/password is different
    //   Authorization: `Basic ${btoa('admin:district')}`,
    // },
    credentials: "include"
  })
  // The .json() method on the Response object returns a Promise that resolves to some
  // data if valid JSON was returned from the server, and rejects with an error otherwise.
  // Read more about Promises here:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
  .then(response => response.json())
  .then(jsonData => {
    // Print the data in the browser console
    console.log(jsonData);
    

    // Render a DataElementList component on the 'root' element,
    // which replaces the text that was rendered when the app started
    ReactDOM.render(
      <DataElementList
        list={jsonData.dataElements}
        page={page}
        pageCount={jsonData.pager.pageCount}
      />,
      document.getElementById('root')
    );
    // return (
    //   <DataElementList
    //     list={jsonData.dataElements}
    //     page={page}
    //     pageCount={jsonData.pager.pageCount}
    //   />
    // );

  });
}


// The data element list component
function DataElementList(props) {
  // By using "destructuring", this:
  //
  // const dataElementList = props.list;
  // const page = props.page;
  // const pageCount = props.pageCount;
  //
  // Can instead be written like this:
  const { list, page, pageCount } = props;
  // See: https://babeljs.io/learn-es2015/#ecmascript-2015-features-destructuring

  // The list includes two buttons at the bottom for navigating between pages
  // Clicking the button calls the loadDataElements function with a different value for
  // the page parameter. When loadDataElements() calls ReactDOM.render, React will
  // automatically update the DOM with as few operations as possible - which is why it's
  // so fast!
  return (
    <div>
      <div>Showing {list.length} data elements:</div>
      <ul>{list.map(de => <DataElement element={de} key={de.id}/>)}</ul>
      <div>Page: {page} of {pageCount}</div>
      <button onClick={() => LoadDataElements(page - 1)}>&lt; Previous page</button>
      <button onClick={() => LoadDataElements(page + 1)}>Next page &gt;</button>
    </div>
  );
}


// The data element component, which just renders the name of the data element as a link
function DataElement(props) {
  const dataElement = props.element;

  return <div><a href={`${dataElement.href}.json`}>{dataElement.displayName}</a></div>;
}

export default LoadDataElements;