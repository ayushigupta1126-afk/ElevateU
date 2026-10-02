const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PracticeQuestion = require("../models/PracticeQuestion");

dotenv.config();

/*
  ELEVATEU — PLACEMENT LAB
  12 Banks × 25 Questions = 300 MCQs

  Banks:
  1. JavaScript
  2. React
  3. Node.js
  4. Express.js
  5. MongoDB
  6. SQL
  7. DBMS
  8. DSA
  9. HTML
  10. CSS
  11. Software Engineering
  12. Web Technology
*/

const q = (
  career,
  topic,
  difficulty,
  question,
  options,
  correctIndex,
  explanation
) => ({
  career,
  topic,
  difficulty,
  question,
  options,
  correctAnswer: options[correctIndex],
  explanation,
  marks: 1,
  isActive: true,
});

const questions = [

  // =========================================================
  // JAVASCRIPT — 25
  // =========================================================

  q(
    "Full Stack Developer",
    "JavaScript",
    "Easy",
    "What is the result of typeof null?",
    ["'null'", "'object'", "'undefined'", "'number'"],
    1,
    "JavaScript historically returns 'object' for typeof null."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Easy",
    "Which keyword declares a block-scoped variable that can be reassigned?",
    ["var", "let", "const", "static"],
    1,
    "let is block-scoped and its value can be reassigned."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Easy",
    "Which method adds an element to the end of an array?",
    ["push()", "pop()", "shift()", "unshift()"],
    0,
    "push() adds one or more elements to the end of an array."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Easy",
    "Which method removes the last element from an array?",
    ["shift()", "slice()", "pop()", "splice()"],
    2,
    "pop() removes and returns the last element."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Medium",
    "What does === compare?",
    ["Only types", "Only values", "Values after coercion", "Values and types without coercion"],
    3,
    "Strict equality compares both value and data type."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Easy",
    "Which value is falsy in JavaScript?",
    ["[]", "{}", "0", "'0'"],
    2,
    "Numeric zero is a falsy value."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Medium",
    "Which function converts a JSON string into a JavaScript value?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
    0,
    "JSON.parse() converts valid JSON text into a JavaScript value."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Easy",
    "Which function converts a JavaScript value into JSON text?",
    ["JSON.parse()", "JSON.stringify()", "JSON.toJSON()", "JSON.encode()"],
    1,
    "JSON.stringify() serializes a JavaScript value into a JSON string."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Medium",
    "What does Array.map() return?",
    ["The original array only", "A new transformed array", "A boolean", "A number"],
    1,
    "map() creates a new array using the value returned by its callback."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Medium",
    "What does Array.filter() return?",
    ["A new array containing matching elements", "The first matching element", "A boolean", "The array length"],
    0,
    "filter() returns a new array containing elements that pass the condition."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Medium",
    "What is a closure?",
    ["A CSS feature", "A function retaining access to its lexical scope", "A loop type", "A browser API"],
    1,
    "A closure allows a function to access variables from its surrounding scope."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Hard",
    "What does hoisting describe?",
    ["Moving files to a server", "Automatic type conversion", "Handling declarations before execution", "DOM rendering"],
    2,
    "JavaScript processes declarations according to hoisting rules before execution."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Easy",
    "Which statement is used to handle exceptions?",
    ["try...catch", "if...else", "switch...case", "for...of"],
    0,
    "try...catch handles runtime exceptions."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Medium",
    "What does a Promise represent?",
    ["A CSS selector", "A future asynchronous result", "A database table", "A DOM node"],
    1,
    "A Promise represents eventual success or failure of an asynchronous operation."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Medium",
    "Which keyword pauses an async function until a Promise settles?",
    ["pause", "wait", "await", "defer"],
    2,
    "await pauses execution inside an async function until the Promise settles."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Easy",
    "What does the spread syntax (...) do with an array?",
    ["Deletes the array", "Expands its elements", "Sorts the array", "Freezes the array"],
    1,
    "Spread syntax expands iterable elements into another expression."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Medium",
    "Which operator returns the right operand when the left is null or undefined?",
    ["||", "&&", "??", "?:"],
    2,
    "The nullish coalescing operator ?? checks specifically for null or undefined."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Medium",
    "What is event bubbling?",
    ["Events moving from target toward ancestors", "Events moving to the server", "Events being deleted", "Events running twice"],
    0,
    "In bubbling, an event propagates from the target element upward."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Easy",
    "Which function schedules code to run after a delay?",
    ["setTimeout()", "setDelay()", "delay()", "after()"],
    0,
    "setTimeout() schedules a callback after a specified delay."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Easy",
    "Which object represents the current HTML document?",
    ["window.document", "browser.html", "page.dom", "document.html"],
    0,
    "The document object represents the loaded HTML document."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Easy",
    "What does addEventListener() do?",
    ["Creates a database", "Registers an event handler", "Removes an element", "Compiles JavaScript"],
    1,
    "addEventListener() registers a function to respond to an event."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Easy",
    "Which loop iterates over values of an iterable?",
    ["for...of", "for...in only", "repeat...until", "foreach keyword"],
    0,
    "for...of iterates over iterable values."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Medium",
    "What does Object.keys(obj) return?",
    ["Object values", "Own enumerable property names", "Prototype methods", "A JSON string"],
    1,
    "Object.keys() returns an array of an object's own enumerable property names."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Medium",
    "What is destructuring?",
    ["Deleting variables", "Extracting values from arrays or objects", "Encrypting objects", "Cloning the DOM"],
    1,
    "Destructuring extracts values from arrays or object properties into variables."
  ),

  q(
    "Full Stack Developer",
    "JavaScript",
    "Easy",
    "Which declaration creates a binding that cannot be reassigned?",
    ["let", "var", "const", "fixed"],
    2,
    "const creates a binding that cannot be reassigned."
  ),

  // =========================================================
  // REACT — 25
  // =========================================================

  q(
    "Frontend Developer",
    "React",
    "Easy",
    "What is React primarily used for?",
    ["Building user interfaces", "Managing SQL databases", "Writing operating systems", "Compiling C++"],
    0,
    "React is a JavaScript library for building user interfaces."
  ),

  q(
    "Frontend Developer",
    "React",
    "Easy",
    "Which syntax is commonly used to describe UI in React?",
    ["JSX", "JDBC", "JSP", "XML only"],
    0,
    "JSX allows HTML-like syntax inside JavaScript."
  ),

  q(
    "Frontend Developer",
    "React",
    "Easy",
    "What is a React component?",
    ["A reusable UI building block", "A database index", "A CSS file", "A server port"],
    0,
    "Components are reusable pieces of a React user interface."
  ),

  q(
    "Frontend Developer",
    "React",
    "Easy",
    "Which hook is used to manage local component state?",
    ["useState", "useRoute", "useClass", "useStoreOnly"],
    0,
    "useState adds state to a function component."
  ),

  q(
    "Frontend Developer",
    "React",
    "Easy",
    "Which hook is commonly used for side effects?",
    ["useEffect", "useSide", "useAction", "useRender"],
    0,
    "useEffect is used for side effects and synchronization with external systems."
  ),

  q(
    "Frontend Developer",
    "React",
    "Easy",
    "What is the purpose of a key in a React list?",
    ["Help React identify list items", "Encrypt list data", "Style every item", "Create a database key"],
    0,
    "Keys help React identify items between renders."
  ),

  q(
    "Frontend Developer",
    "React",
    "Easy",
    "What are props?",
    ["Data passed to a component", "A database query", "A CSS animation", "A browser cookie"],
    0,
    "Props are inputs passed from one component to another."
  ),

  q(
    "Frontend Developer",
    "React",
    "Medium",
    "Can a child component directly mutate its props?",
    ["Yes", "No", "Only in production", "Only with CSS"],
    1,
    "Props should be treated as read-only inputs."
  ),

  q(
    "Frontend Developer",
    "React",
    "Medium",
    "What does lifting state up mean?",
    ["Moving shared state to a common ancestor", "Deleting state", "Putting state in CSS", "Saving state to MongoDB"],
    0,
    "Shared state is moved to the nearest common parent component."
  ),

  q(
    "Frontend Developer",
    "React",
    "Medium",
    "What is a controlled input?",
    ["An input whose value is driven by React state", "An input disabled by CSS", "An OS-controlled input", "An input with no value"],
    0,
    "A controlled input gets its value from React state."
  ),

  q(
    "Frontend Developer",
    "React",
    "Easy",
    "What is conditional rendering?",
    ["Rendering UI based on a condition", "Rendering only CSS", "Rendering without JavaScript", "Rendering the database"],
    0,
    "React can conditionally render elements based on state or props."
  ),

  q(
    "Frontend Developer",
    "React",
    "Hard",
    "What does reconciliation describe in React?",
    ["Comparing UI changes to determine necessary updates", "SQL joins", "HTTP caching", "CSS compilation"],
    0,
    "React uses reconciliation to determine what needs updating."
  ),

  q(
    "Frontend Developer",
    "React",
    "Medium",
    "Why should state updates avoid direct mutation?",
    ["To keep state changes predictable", "Because JavaScript forbids mutation", "Because CSS breaks", "Because HTTP requires it"],
    0,
    "Immutable update patterns make React state changes easier to reason about."
  ),

  q(
    "Frontend Developer",
    "React",
    "Medium",
    "Which hook memoizes a calculated value?",
    ["useMemo", "useValue", "useCacheOnly", "useCompute"],
    0,
    "useMemo memoizes the result of a calculation."
  ),

  q(
    "Frontend Developer",
    "React",
    "Medium",
    "Which hook memoizes a function reference?",
    ["useCallback", "useFunction", "useMemoFunction", "useRefCallback"],
    0,
    "useCallback returns a memoized function reference."
  ),

  q(
    "Frontend Developer",
    "React",
    "Medium",
    "Which hook can hold a mutable value without causing a render when changed?",
    ["useRef", "useMutableState", "useValue", "usePointer"],
    0,
    "Changing ref.current does not by itself cause a component to re-render."
  ),

  q(
    "Frontend Developer",
    "React",
    "Medium",
    "What is the Context API useful for?",
    ["Sharing values through a component tree", "Creating SQL tables", "Serving images", "Compiling JSX"],
    0,
    "Context provides values to components without manually passing props through every level."
  ),

  q(
    "Frontend Developer",
    "React",
    "Easy",
    "What is a Fragment used for?",
    ["Grouping elements without an extra DOM node", "Fetching APIs", "Creating CSS files", "Storing state"],
    0,
    "Fragments group elements without adding an unnecessary DOM wrapper."
  ),

  q(
    "Frontend Developer",
    "React",
    "Easy",
    "What happens when a component's state changes?",
    ["React schedules a re-render", "The browser restarts", "The server restarts", "The database is dropped"],
    0,
    "A state update schedules React to render the component again."
  ),

  q(
    "Frontend Developer",
    "React",
    "Easy",
    "What does React Router commonly provide?",
    ["Client-side routing", "Database migrations", "CSS preprocessing", "Image compression"],
    0,
    "React Router provides routing capabilities for React applications."
  ),

  q(
    "Frontend Developer",
    "React",
    "Medium",
    "What is a custom hook?",
    ["A reusable function that uses React hooks", "A browser extension", "A CSS class", "A database procedure"],
    0,
    "Custom hooks encapsulate reusable stateful logic."
  ),

  q(
    "Frontend Developer",
    "React",
    "Hard",
    "Why is cleanup in useEffect important?",
    ["To remove subscriptions, listeners or timers", "To compile JSX", "To create components", "To change HTML syntax"],
    0,
    "Cleanup prevents stale subscriptions, listeners and timers."
  ),

  q(
    "Frontend Developer",
    "React",
    "Medium",
    "What is prop drilling?",
    ["Passing props through many intermediate components", "Deleting props", "Encrypting props", "Rendering props on a server"],
    0,
    "Prop drilling means passing data through components that do not directly need it."
  ),

  q(
    "Frontend Developer",
    "React",
    "Medium",
    "What can React.memo help with?",
    ["Skipping some renders when props are unchanged", "Adding database indexes", "Creating routes", "Fetching APIs automatically"],
    0,
    "React.memo can prevent some unnecessary renders when props are unchanged."
  ),

  q(
    "Frontend Developer",
    "React",
    "Hard",
    "Why should list keys generally be stable?",
    ["They preserve item identity across updates", "They make CSS faster", "They encrypt data", "They create APIs"],
    0,
    "Stable keys help React associate rendered elements with the correct data."
  ),

  // =========================================================
  // NODE.JS — 25
  // =========================================================

  q("Backend Developer","Node.js","Easy","What is Node.js?",["A JavaScript runtime outside the browser","A CSS framework","A database","A Java compiler"],0,"Node.js runs JavaScript outside the browser."),
  q("Backend Developer","Node.js","Easy","Which engine executes JavaScript in Node.js?",["V8","SpiderMonkey","WebKit","Chakra only"],0,"Node.js uses Google's V8 JavaScript engine."),
  q("Backend Developer","Node.js","Easy","What is npm?",["A JavaScript package manager","A database server","A CSS compiler","A browser"],0,"npm is commonly used to install and manage Node.js packages."),
  q("Backend Developer","Node.js","Easy","Which file usually contains project dependencies and scripts?",["package.json","index.css","README.css","node.lock"],0,"package.json stores project metadata, scripts and dependencies."),
  q("Backend Developer","Node.js","Easy","Which built-in module provides file-system operations?",["fs","httpOnly","pathBrowser","file"],0,"The fs module provides file-system functionality."),
  q("Backend Developer","Node.js","Easy","Which module is used for file and directory paths?",["path","route","urlOnly","folder"],0,"The path module provides path manipulation utilities."),
  q("Backend Developer","Node.js","Easy","What does require() commonly do in CommonJS?",["Loads a module","Starts MongoDB","Creates HTML","Stops the event loop"],0,"require() imports a CommonJS module."),
  q("Backend Developer","Node.js","Medium","What is the event loop responsible for?",["Coordinating asynchronous tasks","Rendering CSS","Creating tables","Compiling Java"],0,"The event loop allows Node.js to handle asynchronous work."),
  q("Backend Developer","Node.js","Easy","What does process.env provide?",["Environment variables","HTML elements","Database rows","CSS properties"],0,"process.env exposes environment variables."),
  q("Backend Developer","Node.js","Easy","Which property contains command-line arguments?",["process.argv","process.argsOnly","console.argv","node.params"],0,"process.argv contains command-line arguments."),
  q("Backend Developer","Node.js","Easy","What does npm install do?",["Installs project dependencies","Deletes Node","Creates a browser","Compiles CSS"],0,"npm install installs dependencies from package.json."),
  q("Backend Developer","Node.js","Medium","What is a Buffer used for?",["Handling binary data","Creating React routes","Storing CSS","Creating SQL tables"],0,"Buffers represent raw binary data."),
  q("Backend Developer","Node.js","Easy","Which module can create an HTTP server?",["http","server","nethttp","web"],0,"The built-in http module can create HTTP servers."),
  q("Backend Developer","Node.js","Medium","Why is asynchronous I/O useful?",["It avoids unnecessary blocking while waiting for I/O","It makes CSS responsive","It changes database schema","It removes JavaScript"],0,"Asynchronous I/O allows other work while I/O operations are pending."),
  q("Backend Developer","Node.js","Easy","What is middleware in a Node web application?",["A function in the request-processing chain","A database table","A React component only","A CSS selector"],0,"Middleware processes requests before the final response."),
  q("Backend Developer","Node.js","Easy","What does nodemon commonly do?",["Restarts an app when files change","Optimizes MongoDB","Creates React components","Encrypts passwords"],0,"nodemon automatically restarts a development server after file changes."),
  q("Backend Developer","Node.js","Easy","What is a module?",["A reusable unit of code","A database record","A browser tab","A CSS color"],0,"Modules organize reusable code."),
  q("Backend Developer","Node.js","Easy","Which command initializes package.json interactively?",["npm init","node initdb","npm startjson","node package"],0,"npm init creates package.json through prompts."),
  q("Backend Developer","Node.js","Medium","What is package-lock.json used for?",["Recording resolved dependency versions","Storing passwords","Defining CSS","Storing HTML"],0,"The lock file records exact resolved dependency versions."),
  q("Backend Developer","Node.js","Easy","What does console.error() do?",["Writes error information to the console","Stops Node automatically","Deletes logs","Creates an API"],0,"console.error() outputs error information."),
  q("Backend Developer","Node.js","Hard","Which module provides APIs for creating child processes?",["child_process","children","process.childOnly","forker"],0,"The child_process module can spawn or fork processes."),
  q("Backend Developer","Node.js","Medium","What is stream processing useful for?",["Handling data incrementally","Creating CSS classes","Changing JSX","Building Mongo indexes"],0,"Streams process data in chunks."),
  q("Backend Developer","Node.js","Easy","What is an npm script?",["A named command defined in package.json","A Mongo query","A browser event","A CSS variable"],0,"Scripts define reusable commands such as start and test."),
  q("Backend Developer","Node.js","Easy","Why use an environment variable such as PORT?",["To configure runtime behavior","To create HTML","To define React props","To create CSS selectors"],0,"Environment variables keep deployment-specific configuration outside source code."),
  q("Backend Developer","Node.js","Hard","Why can CPU-heavy synchronous work be a problem in Node.js?",["It can block the event loop","It changes CSS","It deletes packages","It disables MongoDB"],0,"Long synchronous work can prevent the event loop from handling other requests."),

  // =========================================================
  // EXPRESS.JS — 25
  // =========================================================

  q("Backend Developer","Express.js","Easy","What is Express.js?",["A web framework for Node.js","A database","A CSS framework","A Java compiler"],0,"Express is a web framework for Node.js."),
  q("Backend Developer","Express.js","Easy","How do you define a GET route in Express?",["app.get()","app.fetchOnly()","route.read()","http.getRoute()"],0,"app.get() defines a GET route."),
  q("Backend Developer","Express.js","Easy","What does express.json() do?",["Parses JSON request bodies","Creates MongoDB collections","Renders CSS","Encrypts JWTs"],0,"express.json() parses incoming JSON bodies."),
  q("Backend Developer","Express.js","Easy","What is req.params used for?",["Route parameters","Request headers only","Response data","Environment variables"],0,"req.params contains named route parameters."),
  q("Backend Developer","Express.js","Easy","What is req.query used for?",["URL query parameters","Passwords only","Response headers","Database indexes"],0,"req.query contains URL query-string parameters."),
  q("Backend Developer","Express.js","Easy","What is req.body used for?",["Request body data","Route names","Server port only","Response cookies"],0,"req.body contains parsed request body data."),
  q("Backend Developer","Express.js","Easy","What does res.json() send?",["A JSON response","A CSS file","A database table","A route definition"],0,"res.json() sends a JSON response."),
  q("Backend Developer","Express.js","Easy","What does res.status(404) set?",["HTTP response status code","Request body","Database port","Cookie value"],0,"It sets the response status code to 404."),
  q("Backend Developer","Express.js","Easy","What is middleware?",["A function in the request-response pipeline","A database schema","A CSS selector","A browser plugin"],0,"Middleware runs during request processing."),
  q("Backend Developer","Express.js","Easy","What does next() normally do?",["Passes control to the next middleware","Ends the server","Creates a route","Deletes the request"],0,"next() passes control to the next middleware."),
  q("Backend Developer","Express.js","Easy","What is express.Router() useful for?",["Creating modular routes","Creating Mongo models","Compiling JSX","Serving CSS only"],0,"Routers help organize routes into separate modules."),
  q("Backend Developer","Express.js","Medium","What is CORS?",["A browser security mechanism controlling cross-origin requests","A database protocol","A CSS rule","A package manager"],0,"CORS controls browser access to cross-origin resources."),
  q("Backend Developer","Express.js","Hard","What is the error-handling middleware signature?",["(err, req, res, next)","(req, res)","(error)","(res, next, db)"],0,"Express identifies error middleware using four parameters."),
  q("Backend Developer","Express.js","Easy","What does app.use() do?",["Registers middleware or routers","Creates Mongo indexes","Compiles React","Defines CSS"],0,"app.use() mounts middleware or routers."),
  q("Backend Developer","Express.js","Easy","What does /users/:id create?",["req.params.id","req.query.id only","req.body.id only","res.params.id"],0,"The :id route parameter becomes req.params.id."),
  q("Backend Developer","Express.js","Medium","What is REST commonly associated with?",["Resource-oriented HTTP APIs","CSS animation","Database backups","Java compilation"],0,"REST commonly models resources through HTTP methods and URLs."),
  q("Backend Developer","Express.js","Easy","Which HTTP method is commonly used to create a resource?",["POST","GET","HEAD","OPTIONS"],0,"POST is commonly used to create resources."),
  q("Backend Developer","Express.js","Easy","Which HTTP method commonly represents full replacement?",["PUT","GET","TRACE","HEAD"],0,"PUT commonly represents full replacement or an idempotent update."),
  q("Backend Developer","Express.js","Easy","Which HTTP method is commonly used for partial updates?",["PATCH","CONNECT","OPTIONS","HEAD"],0,"PATCH is intended for partial modifications."),
  q("Backend Developer","Express.js","Easy","What does app.listen() do?",["Starts the server listening on a port","Creates a database","Parses JSON","Adds middleware"],0,"app.listen() starts an HTTP server."),
  q("Backend Developer","Express.js","Medium","Why validate request data on the server?",["Clients cannot be trusted to send valid data","Browsers always validate APIs","It makes CSS faster","It replaces authentication"],0,"Server-side validation protects application logic and data integrity."),
  q("Backend Developer","Express.js","Easy","What does HTTP 401 commonly indicate?",["Authentication is required or invalid","Successful creation","Server crash","Not found"],0,"401 indicates missing or invalid authentication."),
  q("Backend Developer","Express.js","Easy","What does HTTP 403 commonly indicate?",["The client is authenticated but not permitted","Resource created","Bad JSON only","Resource not found"],0,"403 generally means the request is understood but not authorized."),
  q("Backend Developer","Express.js","Easy","What does HTTP 500 commonly indicate?",["Unexpected server-side error","Successful response","Client redirect","Authentication success"],0,"500 represents an internal server error."),
  q("Backend Developer","Express.js","Medium","Why separate routes and controllers?",["To organize routing and business logic","Because Express requires it","To avoid JavaScript","To replace MongoDB"],0,"Separating responsibilities improves maintainability."),

  // =========================================================
  // MONGODB — 25
  // =========================================================

  q("Full Stack Developer","MongoDB","Easy","What type of database is MongoDB?",["Document-oriented NoSQL database","Relational-only database","Graph-only database","Key-value-only database"],0,"MongoDB stores flexible BSON documents."),
  q("Full Stack Developer","MongoDB","Easy","A MongoDB collection is roughly similar to what relational concept?",["Table","Column","Row","Index"],0,"A collection is roughly analogous to a relational table."),
  q("Full Stack Developer","MongoDB","Easy","A MongoDB document is roughly similar to what relational concept?",["Row/record","Database server","Column type","SQL query"],0,"A document represents a stored record."),
  q("Full Stack Developer","MongoDB","Easy","What format is MongoDB's stored document representation based on?",["BSON","CSV","HTML","CSS"],0,"MongoDB stores documents using BSON."),
  q("Full Stack Developer","MongoDB","Easy","What is the default identifier field in a MongoDB document?",["_id","idOnly","primary","key"],0,"MongoDB documents normally contain an _id field."),
  q("Full Stack Developer","MongoDB","Easy","Which method inserts one document?",["insertOne()","addRow()","createOneRow()","pushDocument()"],0,"insertOne() inserts a single document."),
  q("Full Stack Developer","MongoDB","Easy","Which method finds documents?",["find()","findAllRows()","selectMany()","queryAllOnly()"],0,"find() queries documents matching a filter."),
  q("Full Stack Developer","MongoDB","Easy","Which method updates one matching document?",["updateOne()","changeOneRow()","editOneSQL()","modifyRowOnly()"],0,"updateOne() updates the first matching document."),
  q("Full Stack Developer","MongoDB","Easy","Which method deletes one matching document?",["deleteOne()","removeRowOnly()","dropOne()","eraseDocumentOnly()"],0,"deleteOne() deletes the first matching document."),
  q("Full Stack Developer","MongoDB","Medium","What is a MongoDB index used for?",["Improving query performance","Storing passwords","Replacing documents","Creating APIs"],0,"Indexes can speed supported queries."),
  q("Full Stack Developer","MongoDB","Medium","What does a unique index enforce?",["No duplicate indexed values","All values are strings","Documents cannot be deleted","Collections cannot grow"],0,"A unique index prevents duplicate indexed key values."),
  q("Full Stack Developer","MongoDB","Medium","What is aggregation used for?",["Processing and transforming document data","Starting Node","Creating CSS","Authenticating users automatically"],0,"Aggregation pipelines analyze and transform documents."),
  q("Full Stack Developer","MongoDB","Medium","Which aggregation stage filters documents?",["$match","$filterOnly","$whereSQL","$select"],0,"$match filters documents according to a condition."),
  q("Full Stack Developer","MongoDB","Medium","Which aggregation stage groups documents?",["$group","$cluster","$collect","$bucketOnly"],0,"$group combines documents according to a grouping expression."),
  q("Full Stack Developer","MongoDB","Medium","Which aggregation stage controls returned fields?",["$project","$fieldsOnly","$selectSQL","$columns"],0,"$project includes, excludes or computes fields."),
  q("Full Stack Developer","MongoDB","Medium","What does populate() in Mongoose commonly do?",["Loads referenced documents","Creates indexes automatically","Deletes references","Converts MongoDB to SQL"],0,"Mongoose populate() replaces references with related documents."),
  q("Full Stack Developer","MongoDB","Easy","What is a Mongoose schema?",["A structure describing document fields and rules","A database server","A React component","A CSS file"],0,"A schema defines fields, types, defaults and validation."),
  q("Full Stack Developer","MongoDB","Easy","What is a Mongoose model?",["An interface for interacting with a collection","A React hook","An HTTP header","A CSS class"],0,"A model provides methods for querying and modifying a collection."),
  q("Full Stack Developer","MongoDB","Medium","What does $set do in an update?",["Sets field values","Deletes a collection","Sorts results","Creates a database"],0,"$set assigns values to specified fields."),
  q("Full Stack Developer","MongoDB","Medium","What does $push do?",["Adds an element to an array","Removes the first element","Sorts an array","Deletes a document"],0,"$push appends a value to an array field."),
  q("Full Stack Developer","MongoDB","Medium","What does $in match?",["A field matching any value in a specified array","Only null","Only strings","Only regular expressions"],0,"$in matches when a field equals one of the specified values."),
  q("Full Stack Developer","MongoDB","Hard","What is replication used for?",["Maintaining copies for availability and redundancy","CSS caching","Rendering HTML","Parsing JSON"],0,"Replication maintains multiple copies of data."),
  q("Full Stack Developer","MongoDB","Hard","What is sharding?",["Distributing data across servers","Encrypting documents","Formatting JSON","Creating indexes only"],0,"Sharding distributes data across multiple servers."),
  q("Full Stack Developer","MongoDB","Medium","What does projection control?",["Which fields are returned","Which database is deleted","Which server starts","Which indexes are created"],0,"Projection controls included or excluded fields."),
  q("Full Stack Developer","MongoDB","Hard","Why should user-supplied MongoDB filters be validated?",["To prevent unintended or unsafe queries","Because MongoDB cannot store strings","To create CSS","To disable authentication"],0,"Validation and safe query construction reduce unintended query behavior."),

  // =========================================================
  // SQL — 25
  // =========================================================

  q("Backend Developer","SQL","Easy","Which SQL command retrieves rows?",["SELECT","GET","FETCHROWS","READ"],0,"SELECT retrieves data."),
  q("Backend Developer","SQL","Easy","Which clause filters rows?",["WHERE","FILTER","WHEN","HAVINGONLY"],0,"WHERE filters individual rows."),
  q("Backend Developer","SQL","Easy","Which clause sorts results?",["ORDER BY","SORT USING","ARRANGE","GROUP BY"],0,"ORDER BY sorts query results."),
  q("Backend Developer","SQL","Easy","Which keyword removes duplicate result rows?",["DISTINCT","UNIQUEONLY","DEDUP","SINGLE"],0,"DISTINCT removes duplicate result combinations."),
  q("Backend Developer","SQL","Easy","Which clause groups rows?",["GROUP BY","ORDER BY","CLUSTER BY","COMBINE"],0,"GROUP BY forms groups for aggregate calculations."),
  q("Backend Developer","SQL","Medium","Which clause filters groups after aggregation?",["HAVING","WHERE","GROUP FILTER","AFTER"],0,"HAVING filters grouped results."),
  q("Backend Developer","SQL","Easy","Which function counts rows?",["COUNT()","NUMBER()","ROWS()","TOTALROWS()"],0,"COUNT() counts rows or non-null expression values."),
  q("Backend Developer","SQL","Easy","Which function calculates an average?",["AVG()","MEANONLY()","AVERAGEONLY()","MID()"],0,"AVG() calculates the arithmetic mean."),
  q("Backend Developer","SQL","Easy","Which join returns matching rows from both tables?",["INNER JOIN","LEFT ONLY","RIGHT ONLY","FULL ONLY"],0,"INNER JOIN returns rows satisfying the join condition."),
  q("Backend Developer","SQL","Easy","Which join keeps all rows from the left table?",["LEFT JOIN","INNER JOIN","RIGHT JOIN","CROSS JOIN"],0,"LEFT JOIN preserves all rows from the left table."),
  q("Backend Developer","SQL","Easy","What does PRIMARY KEY enforce?",["Unique row identity and non-null values","Only sorting","Only text indexing","Foreign references only"],0,"A primary key uniquely identifies rows."),
  q("Backend Developer","SQL","Easy","What does a FOREIGN KEY represent?",["A reference to a key in another table","A password","A view","A stored procedure"],0,"A foreign key establishes a relationship to a referenced key."),
  q("Backend Developer","SQL","Easy","Which command adds rows?",["INSERT","ADD ROWS","APPEND SQL","CREATE ROW"],0,"INSERT adds rows to a table."),
  q("Backend Developer","SQL","Easy","Which command changes existing rows?",["UPDATE","CHANGE TABLE","MODIFY ROWS","ALTER ROW"],0,"UPDATE modifies existing rows."),
  q("Backend Developer","SQL","Easy","Which command removes selected rows?",["DELETE","REMOVE TABLE","DROP ROWS","CLEAR"],0,"DELETE removes rows matching a condition."),
  q("Backend Developer","SQL","Easy","What does DROP TABLE do?",["Removes the table definition and its data","Deletes one row","Updates rows","Sorts a table"],0,"DROP TABLE removes the table."),
  q("Backend Developer","SQL","Medium","What does ALTER TABLE commonly do?",["Changes a table definition","Queries rows","Starts a transaction","Creates a user session"],0,"ALTER TABLE modifies table structure."),
  q("Backend Developer","SQL","Medium","What is normalization intended to reduce?",["Redundancy and update anomalies","Query syntax","Indexes","Transactions"],0,"Normalization organizes data to reduce redundancy and anomalies."),
  q("Backend Developer","SQL","Medium","What is a view?",["A stored query presented as a virtual table","A physical backup","A primary key","A database user"],0,"A view is a virtual table based on a query."),
  q("Backend Developer","SQL","Medium","What does COMMIT do?",["Makes transaction changes permanent","Cancels a transaction","Creates a table","Starts a server"],0,"COMMIT permanently records transaction changes."),
  q("Backend Developer","SQL","Medium","What does ROLLBACK do?",["Undoes uncommitted transaction changes","Deletes the database","Creates an index","Commits automatically"],0,"ROLLBACK reverts uncommitted changes."),
  q("Backend Developer","SQL","Medium","What does ACID stand for?",["Atomicity, Consistency, Isolation, Durability","Accuracy, Control, Indexing, Data","Access, Consistency, Integrity, Design","Atomicity, Cache, Isolation, Data"],0,"ACID describes important transaction properties."),
  q("Backend Developer","SQL","Medium","What is an index generally used for?",["Faster data lookup","Replacing tables","Guaranteeing uniqueness always","Encrypting rows"],0,"Indexes can speed selected queries but add storage/write overhead."),
  q("Backend Developer","SQL","Hard","What is a correlated subquery?",["A subquery referring to columns from the outer query","A query with no FROM clause","A query creating indexes","A query with only constants"],0,"A correlated subquery depends on values from the outer query."),
  q("Backend Developer","SQL","Hard","Why use parameterized SQL queries?",["To separate data from SQL syntax safely","To make tables larger","To remove indexes","To disable transactions"],0,"Parameterized queries help prevent SQL injection."),

  // =========================================================
  // DBMS — 25
  // =========================================================

  q("Software Developer","DBMS","Easy","What does DBMS stand for?",["Database Management System","Data Backup Management Service","Database Machine System","Digital Base Management Software"],0,"DBMS stands for Database Management System."),
  q("Software Developer","DBMS","Easy","What is a database schema?",["The logical structure of database objects","A backup file","A password","A query result"],0,"A schema describes the structure of database objects."),
  q("Software Developer","DBMS","Medium","What is a candidate key?",["A minimal attribute set that uniquely identifies a row","Any non-unique column","A foreign table","A backup key"],0,"A candidate key is a minimal superkey."),
  q("Software Developer","DBMS","Medium","What is a superkey?",["Any attribute set that uniquely identifies rows","Only the primary key","Only a foreign key","A non-unique index"],0,"A superkey uniquely identifies tuples and may contain extra attributes."),
  q("Software Developer","DBMS","Medium","What is referential integrity?",["Keeping foreign-key references valid","Sorting rows","Encrypting columns","Compressing tables"],0,"Referential integrity keeps relationships between tables valid."),
  q("Software Developer","DBMS","Easy","What is 1NF?",["Atomic values and no repeating groups","No foreign keys","No indexes","Only one table"],0,"First normal form requires atomic values."),
  q("Software Developer","DBMS","Medium","What is 2NF mainly concerned with?",["Removing partial dependency","Removing all foreign keys","Removing all indexes","Removing transactions"],0,"2NF removes partial dependency on part of a composite key."),
  q("Software Developer","DBMS","Medium","What is 3NF mainly concerned with?",["Removing transitive dependency","Removing primary keys","Removing relationships","Removing SQL"],0,"3NF addresses transitive dependencies."),
  q("Software Developer","DBMS","Hard","What is BCNF?",["A stronger normal form where every determinant is a candidate key","A backup format","A transaction protocol","A query language"],0,"BCNF requires every determinant to be a candidate key."),
  q("Software Developer","DBMS","Easy","What is a transaction?",["A logical unit of database work","A database user","A table column","An index"],0,"A transaction groups database operations."),
  q("Software Developer","DBMS","Medium","What is concurrency control?",["Managing simultaneous transactions safely","Creating tables","Compressing backups","Writing HTML"],0,"Concurrency control prevents unsafe interference among transactions."),
  q("Software Developer","DBMS","Hard","What is a deadlock?",["Transactions waiting indefinitely for resources held by each other","A successful commit","A backup","A read-only query"],0,"Deadlock occurs when transactions wait on each other in a cycle."),
  q("Software Developer","DBMS","Hard","What is serializability?",["Making a concurrent schedule equivalent to a serial execution","Sorting rows","Encrypting data","Deleting duplicates"],0,"Serializable schedules preserve correctness comparable to a serial order."),
  q("Software Developer","DBMS","Medium","What is a lock?",["A mechanism controlling concurrent access to data","A password","A query result","A schema diagram"],0,"Locks regulate access to shared database resources."),
  q("Software Developer","DBMS","Hard","What is two-phase locking?",["A protocol with growing and shrinking lock phases","Two backups","Two SQL queries","Two indexes"],0,"2PL has a growing phase and a shrinking phase."),
  q("Software Developer","DBMS","Medium","What is database recovery?",["Restoring a consistent state after failures","Sorting queries","Creating users","Rendering reports"],0,"Recovery mechanisms restore database consistency after failures."),
  q("Software Developer","DBMS","Medium","What is a checkpoint?",["A recovery point that helps limit recovery work","A primary key","A query optimizer","A foreign key"],0,"Checkpoints reduce the amount of log work needed during recovery."),
  q("Software Developer","DBMS","Medium","What is data independence?",["Changing one schema level with limited impact on higher levels","Deleting data","Duplicating rows","Avoiding SQL"],0,"Data independence separates changes between abstraction levels."),
  q("Software Developer","DBMS","Hard","What is physical data independence?",["Changing physical storage without changing the logical schema","Changing passwords","Changing SQL syntax","Changing business rules"],0,"Physical data independence hides storage changes from logical structure."),
  q("Software Developer","DBMS","Medium","What is a weak entity?",["An entity dependent on another entity for identification","An entity with no attributes","A table without rows","A database without keys"],0,"A weak entity depends on an owner entity for identification."),
  q("Software Developer","DBMS","Easy","What does cardinality describe in ER modeling?",["Relationship quantity between entity instances","Column type","Query speed","Storage size"],0,"Cardinality describes how many instances participate in a relationship."),
  q("Software Developer","DBMS","Easy","What is an ER diagram used for?",["Modeling entities, attributes and relationships","Executing SQL","Encrypting databases","Backing up data"],0,"ER diagrams model conceptual data structures."),
  q("Software Developer","DBMS","Medium","What is a database index?",["An auxiliary structure that can speed selected searches","A replacement for a database","A transaction log","A foreign key always"],0,"Indexes provide efficient access paths for supported queries."),
  q("Software Developer","DBMS","Hard","What is query optimization?",["Choosing an efficient execution strategy","Changing passwords","Creating HTML","Deleting tables"],0,"A query optimizer evaluates possible execution plans."),
  q("Software Developer","DBMS","Hard","What is denormalization?",["Intentionally adding redundancy for selected goals","Removing all data","Deleting indexes","Converting SQL to HTML"],0,"Denormalization deliberately introduces some redundancy for design or performance reasons."),

  // =========================================================
  // DSA — 25
  // =========================================================

  q("Software Developer","DSA","Easy","What is the time complexity of accessing an array element by index?",["O(1)","O(log n)","O(n)","O(n²)"],0,"Array indexing is constant time under the usual random-access model."),
  q("Software Developer","DSA","Easy","Which data structure follows LIFO?",["Stack","Queue","Heap","Graph"],0,"A stack follows Last In First Out."),
  q("Software Developer","DSA","Easy","Which data structure follows FIFO?",["Queue","Stack","Tree","Heap"],0,"A queue follows First In First Out."),
  q("Software Developer","DSA","Easy","Which structure is commonly used for BFS?",["Queue","Stack","Array only","Set only"],0,"BFS processes vertices level by level using a queue."),
  q("Software Developer","DSA","Easy","Which structure is commonly used for DFS?",["Stack","Queue","Hash table only","Heap only"],0,"DFS can use a stack or recursion."),
  q("Software Developer","DSA","Easy","What is binary search complexity on a sorted array?",["O(log n)","O(1)","O(n)","O(n²)"],0,"Binary search halves the search space each step."),
  q("Software Developer","DSA","Easy","What is linear search worst-case complexity?",["O(n)","O(1)","O(log n)","O(n log n)"],0,"Linear search may inspect every element."),
  q("Software Developer","DSA","Medium","Which sorting algorithm has O(n log n) worst-case time?",["Merge sort","Bubble sort","Linear scan","Selection sort"],0,"Merge sort has O(n log n) worst-case time."),
  q("Software Developer","DSA","Medium","What is the worst-case complexity of basic bubble sort?",["O(n²)","O(log n)","O(n)","O(1)"],0,"Basic bubble sort has quadratic worst-case complexity."),
  q("Software Developer","DSA","Medium","Which data structure gives average O(1) key lookup?",["Hash table","Linked list","Stack","Unbalanced tree"],0,"Hash tables provide average constant-time lookup with good hashing."),
  q("Software Developer","DSA","Easy","What is a linked-list node commonly composed of?",["Data and a link/reference","Only an index","Only a key","A SQL row"],0,"A node stores data and a reference to another node."),
  q("Software Developer","DSA","Medium","What is a major advantage of linked lists?",["Insertion/deletion without shifting contiguous elements","Constant random access","Always less memory","Automatic sorting"],0,"Linked lists can change links without shifting an entire contiguous block."),
  q("Software Developer","DSA","Easy","What is a binary tree?",["A tree where each node has at most two children","A graph with no edges","A sorted array","A queue"],0,"Each binary-tree node has at most two children."),
  q("Software Developer","DSA","Medium","What is a common property of a binary search tree?",["Left keys are ordered below the node and right keys above","Every node has exactly two children","All leaves are at one level","It must be a heap"],0,"BST ordering places smaller keys on one side and larger keys on the other."),
  q("Software Developer","DSA","Easy","Which traversal of a BST gives sorted order for unique keys?",["Inorder","Preorder","Postorder","Level order"],0,"Inorder traversal visits left, root, right."),
  q("Software Developer","DSA","Medium","What is a heap commonly used for?",["Priority queue operations","Constant arbitrary deletion","Storing HTML","Database normalization"],0,"Heaps efficiently support priority-based insertion and removal."),
  q("Software Developer","DSA","Easy","What is recursion?",["A function calling itself directly or indirectly","A loop without a condition","A database transaction","A sorting algorithm"],0,"Recursion solves a problem through smaller recursive instances."),
  q("Software Developer","DSA","Easy","What is a base case?",["A condition that stops recursive calls","The largest input","A loop counter","A graph edge"],0,"The base case prevents recursion from continuing forever."),
  q("Software Developer","DSA","Hard","Dynamic programming commonly relies on what?",["Overlapping subproblems and optimal substructure","Only recursion","Randomization only","Sorting only"],0,"Dynamic programming stores solutions to overlapping subproblems."),
  q("Software Developer","DSA","Easy","What is a graph?",["A collection of vertices connected by edges","A linear array","A stack","A database table only"],0,"Graphs consist of vertices and edges."),
  q("Software Developer","DSA","Easy","What is a directed graph?",["A graph whose edges have direction","A graph with no vertices","A graph with only loops","A graph stored only in SQL"],0,"Directed edges have a source and destination."),
  q("Software Developer","DSA","Hard","Topological sorting is applicable to which graph?",["Directed acyclic graph","Any cyclic graph","Only arrays","Only heaps"],0,"A topological order exists for a DAG."),
  q("Software Developer","DSA","Easy","What is Big-O notation used for?",["Describing asymptotic growth of resource usage","Measuring exact runtime on one machine","Counting variables","Sorting arrays"],0,"Big-O describes growth as input size increases."),
  q("Software Developer","DSA","Hard","Why can a hash table have O(n) worst-case lookup?",["Many keys can collide","Hashing always sorts data","Arrays are slower","The table has no keys"],0,"Many collisions can cause linear lookup behavior."),
  q("Software Developer","DSA","Medium","Which algorithm finds shortest paths from a source in a graph with non-negative edge weights?",["Dijkstra's algorithm","Binary search","Merge sort","DFS only"],0,"Dijkstra's algorithm solves single-source shortest paths with non-negative weights."),

  // =========================================================
  // HTML — 25
  // =========================================================

  q("Frontend Developer","HTML","Easy","What does HTML stand for?",["HyperText Markup Language","HighText Machine Language","Hyperlink Transfer Markup Logic","Home Tool Markup Language"],0,"HTML stands for HyperText Markup Language."),
  q("Frontend Developer","HTML","Easy","Which tag defines the highest-level heading?",["<h1>","<head>","<header1>","<title1>"],0,"h1 represents the highest-level heading."),
  q("Frontend Developer","HTML","Easy","Which tag creates a hyperlink?",["<a>","<link>","<href>","<url>"],0,"The anchor element creates hyperlinks."),
  q("Frontend Developer","HTML","Easy","Which attribute specifies an image source?",["src","href","alt","source"],0,"src specifies the image resource URL."),
  q("Frontend Developer","HTML","Easy","Which attribute provides alternative text for an image?",["alt","title","text","description"],0,"alt provides a text alternative."),
  q("Frontend Developer","HTML","Easy","Which element creates an unordered list?",["<ul>","<ol>","<list>","<li>"],0,"ul creates an unordered list."),
  q("Frontend Developer","HTML","Easy","Which element represents a list item?",["<li>","<item>","<list-item>","<ul-item>"],0,"li represents a list item."),
  q("Frontend Developer","HTML","Easy","Which element creates a form?",["<form>","<input>","<fieldset-only>","<dataform>"],0,"form groups controls for user input and submission."),
  q("Frontend Developer","HTML","Easy","Which input type masks typed characters?",["password","secret","hidden-text","secure"],0,"The password input type masks entered characters."),
  q("Frontend Developer","HTML","Medium","Which attribute connects a label to a form control?",["for","target","bind","control"],0,"The label's for value should match the control's id."),
  q("Frontend Developer","HTML","Medium","What is semantic HTML?",["Using elements according to their meaning","Using only CSS","Using JavaScript for all content","Avoiding headings"],0,"Semantic elements communicate meaning and structure."),
  q("Frontend Developer","HTML","Easy","Which element represents navigation links?",["<nav>","<navigate>","<links>","<menu-links>"],0,"nav represents a navigation section."),
  q("Frontend Developer","HTML","Easy","Which element represents independent article content?",["<article>","<section-only>","<content>","<post-html>"],0,"article represents self-contained content."),
  q("Frontend Developer","HTML","Easy","Which element represents footer content?",["<footer>","<bottom>","<end>","<page-footer>"],0,"footer represents footer content."),
  q("Frontend Developer","HTML","Easy","Which element represents the main content of a page?",["<main>","<body-main>","<content-main>","<primary>"],0,"main represents the dominant content."),
  q("Frontend Developer","HTML","Easy","What does meta charset specify?",["Character encoding","Page color","Image format","Server port"],0,"It specifies the document character encoding."),
  q("Frontend Developer","HTML","Easy","Which element embeds video?",["<video>","<media>","<movie>","<player>"],0,"video embeds video content."),
  q("Frontend Developer","HTML","Easy","Which element embeds audio?",["<audio>","<sound>","<music>","<media-audio>"],0,"audio embeds sound content."),
  q("Frontend Developer","HTML","Easy","What does the lang attribute specify?",["Language of content","Link destination","Image size","Server language"],0,"lang identifies the language of document content."),
  q("Frontend Developer","HTML","Medium","Why are labels important in forms?",["They improve usability and accessibility","They encrypt inputs","They replace validation","They create APIs"],0,"Labels identify form controls and improve accessibility."),
  q("Frontend Developer","HTML","Medium","What is the DOM?",["A tree representation of a document","A CSS framework","A database","A server"],0,"The DOM represents the document as nodes."),
  q("Frontend Developer","HTML","Easy","Which tag defines a table row?",["<tr>","<td>","<row>","<table-row>"],0,"tr represents a table row."),
  q("Frontend Developer","HTML","Easy","Which tag defines a table header cell?",["<th>","<thead-cell>","<header-cell>","<tdh>"],0,"th represents a table header cell."),
  q("Frontend Developer","HTML","Easy","Which tag defines a normal table data cell?",["<td>","<cell>","<data>","<table-data>"],0,"td represents a table data cell."),
  q("Frontend Developer","HTML","Medium","What does the required attribute do?",["Requires a value before successful submission","Makes a field read-only","Hides the field","Encrypts the value"],0,"required enables built-in browser validation requiring a value."),

  // =========================================================
  // CSS — 25
  // =========================================================

  q("Frontend Developer","CSS","Easy","What does CSS stand for?",["Cascading Style Sheets","Computer Style Syntax","Creative Styling System","Cascading Script System"],0,"CSS stands for Cascading Style Sheets."),
  q("Frontend Developer","CSS","Easy","Which selector targets an element by id?",["#id",".id","id:","*id"],0,"The # prefix selects an element by id."),
  q("Frontend Developer","CSS","Easy","Which selector targets a class?",[".class","#class","class:","@class"],0,"The dot prefix selects a class."),
  q("Frontend Developer","CSS","Easy","Which property changes text color?",["color","font-color","text-paint","foreground"],0,"color controls text color."),
  q("Frontend Developer","CSS","Easy","Which property changes background color?",["background-color","bg","color-background","fill-color"],0,"background-color sets the background color."),
  q("Frontend Developer","CSS","Easy","Which property controls font size?",["font-size","text-size","size","font"],0,"font-size controls text size."),
  q("Frontend Developer","CSS","Easy","What does display:flex create?",["A flexbox layout","A grid only","An animation only","A print layout"],0,"display:flex creates a flex formatting context."),
  q("Frontend Developer","CSS","Medium","Which property controls main-axis distribution in flexbox?",["justify-content","align-main","flex-main","main-distribute"],0,"justify-content distributes items along the main axis."),
  q("Frontend Developer","CSS","Medium","Which property controls cross-axis alignment in flexbox?",["align-items","justify-items","cross-align","flex-cross"],0,"align-items controls cross-axis alignment."),
  q("Frontend Developer","CSS","Easy","What does CSS Grid provide?",["Two-dimensional layout","Only text styling","JavaScript execution","Database layout"],0,"CSS Grid supports rows and columns."),
  q("Frontend Developer","CSS","Easy","Which property controls outer spacing?",["margin","padding","gap-only","space"],0,"margin controls space outside an element."),
  q("Frontend Developer","CSS","Easy","Which property controls inner spacing?",["padding","margin","inside-space","border-gap"],0,"padding controls space between content and border."),
  q("Frontend Developer","CSS","Medium","What does box-sizing:border-box do?",["Includes padding and border in declared dimensions","Removes padding","Makes an element fixed","Disables borders"],0,"border-box includes padding and border within the declared width and height."),
  q("Frontend Developer","CSS","Medium","What does position:fixed generally do?",["Positions an element relative to the viewport","Keeps it in normal flow","Makes it a grid","Hides it"],0,"Fixed positioning generally anchors an element to the viewport."),
  q("Frontend Developer","CSS","Medium","What does position:absolute use as its containing block?",["The nearest positioned ancestor","Only the viewport","The next sibling","The body text"],0,"Absolute positioning uses the nearest positioned containing block."),
  q("Frontend Developer","CSS","Medium","What does z-index control?",["Stacking order","Font size","Grid width","Opacity only"],0,"z-index affects stacking order in applicable contexts."),
  q("Frontend Developer","CSS","Easy","What is a media query used for?",["Applying styles based on conditions such as viewport size","Fetching APIs","Creating HTML","Sorting data"],0,"Media queries support responsive conditional styles."),
  q("Frontend Developer","CSS","Easy","What is a pseudo-class?",["A selector for a state such as :hover","A CSS file","A JavaScript function","An HTML tag"],0,"Pseudo-classes select elements in particular states."),
  q("Frontend Developer","CSS","Easy","What is a pseudo-element?",["A selector such as ::before or ::after","A database field","An HTML document","A media query"],0,"Pseudo-elements style conceptual parts of elements."),
  q("Frontend Developer","CSS","Easy","What does opacity:0 do?",["Makes an element fully transparent","Deletes it from layout","Makes it opaque","Disables CSS"],0,"opacity:0 makes the element transparent while it can still occupy space."),
  q("Frontend Developer","CSS","Easy","What does overflow:hidden generally do?",["Clips overflowing content","Adds scrolling always","Deletes children","Expands the element"],0,"It clips content that exceeds the element's box."),
  q("Frontend Developer","CSS","Medium","What is CSS specificity used for?",["Resolving competing declarations","Compressing CSS","Creating HTML","Executing JavaScript"],0,"Specificity contributes to determining which rule wins."),
  q("Frontend Developer","CSS","Easy","Which has higher specificity?",["#id",".class","element","universal selector"],0,"An ID selector has higher specificity than a class or element selector."),
  q("Frontend Developer","CSS","Medium","What does transition provide?",["Smooth interpolation between property values","Database transactions","Page routing","HTML validation"],0,"CSS transitions animate property changes over time."),
  q("Frontend Developer","CSS","Easy","What is rem relative to?",["The root element's font size","The parent width","Viewport height","Image size"],0,"rem units are relative to the root element's font size."),

  // =========================================================
  // SOFTWARE ENGINEERING — 25
  // =========================================================

  q("Software Developer","Software Engineering","Easy","What is software engineering?",["A systematic approach to developing and maintaining software","Only writing code","Only testing","Only database design"],0,"Software engineering uses systematic processes for software development and maintenance."),
  q("Software Developer","Software Engineering","Easy","What is a functional requirement?",["A behavior or service the system must provide","A color preference","A developer salary","A hardware brand"],0,"Functional requirements specify what the system should do."),
  q("Software Developer","Software Engineering","Easy","What is a non-functional requirement?",["A quality or constraint such as performance or security","A user story only","A database row","A programming language"],0,"Non-functional requirements describe qualities or constraints."),
  q("Software Developer","Software Engineering","Easy","What does SDLC stand for?",["Software Development Life Cycle","System Data Logic Code","Software Design Language Compiler","Service Deployment Level Control"],0,"SDLC describes stages involved in software development."),
  q("Software Developer","Software Engineering","Easy","Which model emphasizes sequential phases?",["Waterfall","Agile","Scrum board","Prototype-only"],0,"Waterfall traditionally follows sequential phases."),
  q("Software Developer","Software Engineering","Medium","What is Agile?",["An iterative approach emphasizing adaptability","A programming language","A database","A testing tool"],0,"Agile emphasizes iterative delivery and responding to change."),
  q("Software Developer","Software Engineering","Easy","What is Scrum?",["An Agile framework","A database model","A compiler","A UML diagram"],0,"Scrum is an Agile framework."),
  q("Software Developer","Software Engineering","Easy","What is a sprint?",["A fixed-length development period in Scrum","A bug report","A database backup","A deployment server"],0,"A sprint is a time-boxed Scrum period."),
  q("Software Developer","Software Engineering","Easy","What is version control used for?",["Tracking changes and collaboration","Only compiling code","Testing UI colors","Hosting databases"],0,"Version control tracks file changes and supports collaboration."),
  q("Software Developer","Software Engineering","Easy","What is Git?",["A distributed version control system","A database","A web server","A testing framework"],0,"Git is a distributed version control system."),
  q("Software Developer","Software Engineering","Medium","What is a software design pattern?",["A reusable solution to a recurring design problem","A coding error","A database schema","A UI color scheme"],0,"Design patterns capture reusable design approaches."),
  q("Software Developer","Software Engineering","Medium","What is cohesion?",["How closely related responsibilities within a module are","Dependency between modules","Network latency","Code length"],0,"High cohesion means a module has closely related responsibilities."),
  q("Software Developer","Software Engineering","Medium","What is coupling?",["The degree of dependency between modules","The number of tests","User satisfaction","Database size"],0,"Coupling measures dependency between components."),
  q("Software Developer","Software Engineering","Easy","What is unit testing?",["Testing a small unit of code in isolation","Testing the whole organization","Testing production traffic","Checking hardware"],0,"Unit tests focus on small units such as functions or classes."),
  q("Software Developer","Software Engineering","Medium","What is integration testing?",["Testing interactions between components","Testing one function only","Testing UI colors","Writing requirements"],0,"Integration tests verify that components work together."),
  q("Software Developer","Software Engineering","Medium","What is regression testing?",["Checking that changes did not break existing behavior","Testing only new features","Deleting old tests","Testing network speed"],0,"Regression testing detects unintended breakage after changes."),
  q("Software Developer","Software Engineering","Medium","What is black-box testing?",["Testing behavior without relying on internal implementation","Testing source code line by line","Testing hardware","Testing only SQL"],0,"Black-box testing focuses on externally observable behavior."),
  q("Software Developer","Software Engineering","Medium","What is white-box testing?",["Testing with knowledge of internal implementation","Testing without inputs","Testing only UI","Testing deployment cost"],0,"White-box testing considers internal code structure."),
  q("Software Developer","Software Engineering","Easy","What is debugging?",["Finding and fixing software defects","Writing requirements","Creating designs only","Deploying databases"],0,"Debugging identifies and fixes causes of failures."),
  q("Software Developer","Software Engineering","Medium","What is refactoring?",["Improving internal code structure without changing intended behavior","Adding random features","Deleting tests","Changing requirements"],0,"Refactoring improves code structure while preserving behavior."),
  q("Software Developer","Software Engineering","Medium","What is technical debt?",["Future cost caused by expedient technical choices","A bank loan","A database index","A user story"],0,"Technical debt represents future maintenance or remediation cost."),
  q("Software Developer","Software Engineering","Easy","What is UML?",["A standardized modeling language for software systems","A programming language","A database engine","A testing library"],0,"UML provides standardized diagrams and notation."),
  q("Software Developer","Software Engineering","Easy","What is a use case?",["A description of actor-system interaction to achieve a goal","A compiler","A database index","A CSS component"],0,"Use cases describe goal-oriented interactions with a system."),
  q("Software Developer","Software Engineering","Medium","What is risk management?",["Identifying, analyzing and responding to project risks","Writing only code","Deleting requirements","Choosing colors"],0,"Risk management addresses uncertainty affecting project objectives."),
  q("Software Developer","Software Engineering","Medium","What is CI/CD?",["Practices for automating integration, testing and delivery/deployment","A database protocol","A CSS standard","A programming language"],0,"CI/CD automates parts of building, testing and delivering software."),

  // =========================================================
  // WEB TECHNOLOGY — 25
  // =========================================================

  q("Full Stack Developer","Web Technology","Easy","What does HTTP stand for?",["HyperText Transfer Protocol","High Transfer Text Process","Hyperlink Transport Tool","Host Transfer Type"],0,"HTTP stands for HyperText Transfer Protocol."),
  q("Full Stack Developer","Web Technology","Easy","Which HTTP method is normally used to retrieve a resource?",["GET","POST","DELETE","PATCH"],0,"GET is commonly used to retrieve resources."),
  q("Full Stack Developer","Web Technology","Easy","Which HTTP status indicates success?",["200","301","404","500"],0,"200 OK indicates successful processing."),
  q("Full Stack Developer","Web Technology","Easy","Which status means resource not found?",["404","200","201","503"],0,"404 indicates that the requested resource was not found."),
  q("Full Stack Developer","Web Technology","Easy","Which status commonly means resource created?",["201","200","204","304"],0,"201 Created indicates successful resource creation."),
  q("Full Stack Developer","Web Technology","Medium","What is HTTPS?",["HTTP protected using TLS","A faster HTTP version without encryption","A database protocol","A CSS standard"],0,"HTTPS uses TLS to protect HTTP communication."),
  q("Full Stack Developer","Web Technology","Easy","What is DNS used for?",["Mapping domain names to network addresses","Encrypting passwords","Rendering HTML","Storing cookies only"],0,"DNS resolves domain names to network-related records."),
  q("Full Stack Developer","Web Technology","Easy","What is an IP address?",["An address identifying a network interface/host","A password","A CSS selector","A database key"],0,"An IP address identifies a network interface or endpoint."),
  q("Full Stack Developer","Web Technology","Easy","What does URL stand for?",["Uniform Resource Locator","User Route Language","Universal Runtime Link","Uniform Request List"],0,"URL stands for Uniform Resource Locator."),
  q("Full Stack Developer","Web Technology","Easy","What is a cookie?",["Small browser-stored data associated with a site","A database table","An HTML tag","A server port"],0,"Cookies store small pieces of client-associated data."),
  q("Full Stack Developer","Web Technology","Easy","What is localStorage?",["Persistent browser key-value storage","A server database","A CSS cache","An HTTP method"],0,"localStorage provides persistent storage for an origin."),
  q("Full Stack Developer","Web Technology","Easy","What is sessionStorage?",["Browser storage scoped to a page session","A server database","A DNS record","A CSS property"],0,"sessionStorage stores data for the current page session."),
  q("Full Stack Developer","Web Technology","Easy","What is the DOM?",["A programmable representation of an HTML document","A database","A web server","A DNS server"],0,"The DOM represents the document structure as nodes."),
  q("Full Stack Developer","Web Technology","Easy","What is an API?",["An interface through which software components communicate","Only a database","A CSS selector","A browser tab"],0,"An API defines how software components communicate."),
  q("Full Stack Developer","Web Technology","Medium","What is REST?",["An architectural style commonly used for resource-oriented web APIs","A programming language","A database engine","A browser"],0,"REST is an architectural style commonly used with HTTP APIs."),
  q("Full Stack Developer","Web Technology","Easy","What is JSON?",["A lightweight data interchange format","A CSS framework","A database engine","An image format only"],0,"JSON is a text-based data interchange format."),
  q("Full Stack Developer","Web Technology","Medium","What is AJAX commonly used to describe?",["Asynchronous browser-server requests without a full page reload","A database engine","A CSS animation","A server OS"],0,"AJAX refers to asynchronous communication between browser and server."),
  q("Full Stack Developer","Web Technology","Easy","What is responsive web design?",["Designing layouts that adapt to different screen sizes","Making websites faster only","Using only mobile HTML","Disabling CSS"],0,"Responsive design adapts presentation to different viewport sizes."),
  q("Full Stack Developer","Web Technology","Medium","What is client-side rendering?",["Generating or updating UI in the browser","Rendering only on a database","Rendering only on a server","Rendering CSS on a router"],0,"Client-side rendering performs significant UI rendering work in the browser."),
  q("Full Stack Developer","Web Technology","Medium","What is server-side rendering?",["Generating HTML on the server before sending it to the client","Rendering only in CSS","Rendering database rows","Rendering inside DNS"],0,"SSR generates HTML on the server."),
  q("Full Stack Developer","Web Technology","Medium","What is caching?",["Storing reusable data or responses to reduce repeated work","Deleting data","Encrypting HTML","Creating users"],0,"Caching stores reusable results to improve performance."),
  q("Full Stack Developer","Web Technology","Medium","What is a CDN?",["A distributed network for delivering content closer to users","A database language","A browser extension","A CSS preprocessor"],0,"A CDN distributes content through locations closer to users."),
  q("Full Stack Developer","Web Technology","Hard","What is WebSocket useful for?",["Persistent bidirectional communication","One-time HTML only","Database normalization","CSS layout"],0,"WebSockets provide ongoing two-way communication."),
  q("Full Stack Developer","Web Technology","Easy","What is authentication?",["Verifying who a user is","Determining permissions","Formatting HTML","Compressing images"],0,"Authentication establishes user identity."),
  q("Full Stack Developer","Web Technology","Easy","What is authorization?",["Determining what an authenticated user is allowed to do","Verifying identity only","Creating DNS records","Rendering CSS"],0,"Authorization controls access to resources and actions."),
];


// =========================================================
// VALIDATION
// =========================================================

const expectedBanks = {
  JavaScript: 25,
  React: 25,
  "Node.js": 25,
  "Express.js": 25,
  MongoDB: 25,
  SQL: 25,
  DBMS: 25,
  DSA: 25,
  HTML: 25,
  CSS: 25,
  "Software Engineering": 25,
  "Web Technology": 25,
};

const validateQuestions = () => {
  if (questions.length !== 300) {
    throw new Error(
      `Expected 300 questions, but found ${questions.length}.`
    );
  }

  const counts = {};

  questions.forEach((item, index) => {
    counts[item.topic] = (counts[item.topic] || 0) + 1;

    if (!item.question) {
      throw new Error(`Question ${index + 1} has no question text.`);
    }

    if (!Array.isArray(item.options) || item.options.length !== 4) {
      throw new Error(
        `Question ${index + 1} must have exactly 4 options.`
      );
    }

    if (!item.options.includes(item.correctAnswer)) {
      throw new Error(
        `Question ${index + 1} has an invalid correct answer.`
      );
    }

    if (!["Easy", "Medium", "Hard"].includes(item.difficulty)) {
      throw new Error(
        `Question ${index + 1} has an invalid difficulty.`
      );
    }
  });

  for (const [topic, expected] of Object.entries(expectedBanks)) {
    if (counts[topic] !== expected) {
      throw new Error(
        `${topic}: expected ${expected}, found ${counts[topic] || 0}.`
      );
    }
  }

  return counts;
};


// =========================================================
// SEED DATABASE
// =========================================================

const seedQuestions = async () => {
  try {
    validateQuestions();

    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    // Replace old MCQ bank with the new 300-question bank.
    await PracticeQuestion.deleteMany({});

    console.log("Old placement MCQs removed.");

    await PracticeQuestion.insertMany(questions);

    console.log("\n========================================");
    console.log("ELEVATEU PLACEMENT LAB");
    console.log("MCQ SEED SUCCESSFUL");
    console.log("========================================");

    console.log(`Total questions inserted: ${questions.length}`);

    const counts = await PracticeQuestion.aggregate([
      {
        $group: {
          _id: "$topic",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    console.log("\nQuestions per bank:");

    counts.forEach((item) => {
      console.log(`- ${item._id}: ${item.count}`);
    });

    console.log("\n========================================");
    console.log("300 MCQs successfully added.");
    console.log("========================================\n");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Placement question seed error:");
    console.error(error);

    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error("MongoDB close error:", closeError.message);
    }

    process.exit(1);
  }
};

seedQuestions();