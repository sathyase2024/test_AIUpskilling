def _section(stype, content="", language="", level=2, items=None, answer=-1, explanation=""):
    return {
        "type": stype,
        "content": content,
        "language": language,
        "level": level,
        "items": items if items is not None else [],
        "answer": answer,
        "explanation": explanation,
    }


lesson1_dict = {
    "lessonId": "sample-1",
    "title": "Java Mastery: Introduction & Core Concepts",
    "type": "reading",
    "topicName": "Java Mastery",
    "estimatedMinutes": 30,
    "xpReward": 75,
    "generated": True,
    "sections": [
        _section("heading", "Overview", level=2),
        _section(
            "paragraph",
            "Java solves one of the hardest problems in software: writing code once and running it reliably across thousands of different machines, operating systems, and processor architectures. Think of the Java Virtual Machine as a universal power adapter you carry while traveling abroad. Your laptop charger does not care whether the wall socket is in Tokyo, Berlin, or New York because the adapter normalizes the interface. The JVM does the same for your compiled program, translating portable bytecode into instructions any host can execute. This is precisely why Java has dominated enterprise software for nearly three decades. Banks, insurance companies, airlines, and trading platforms run mission-critical systems on the JVM because it offers a rare combination of strong static typing, mature tooling, predictable performance, and an enormous ecosystem of battle-tested libraries. When a single transaction error can cost millions, the reliability and maintainability Java provides matters far more than raw novelty.",
        ),
        _section("heading", "Core Concepts", level=2),
        _section(
            "paragraph",
            "Object-oriented programming organizes software around objects, which bundle state (fields) and behavior (methods) into cohesive units. Java's four pillars are encapsulation, inheritance, polymorphism, and abstraction. Encapsulation hides internal data behind methods so invariants cannot be violated from the outside. Inheritance lets a subclass reuse and extend a parent's behavior, while interfaces define contracts that unrelated classes can fulfill, enabling polymorphism: code written against an interface works with any implementation. The mental model that unlocks Java is this: you describe types and their relationships at compile time, and the JVM resolves the concrete behavior at runtime through dynamic dispatch using a method table called the vtable. The JVM itself is an abstract computing machine. Your source compiles to platform-neutral bytecode that the JVM interprets and then compiles to native code on the fly. Mastering Java means thinking simultaneously about clean type hierarchies and the runtime machinery that brings them to life.",
        ),
        _section(
            "code",
            "// Demonstrates encapsulation, inheritance, interfaces, and polymorphism\n\n// An interface defines a contract any implementer must honor\ninterface Drawable {\n    void draw();\n}\n\n// Abstract base class with encapsulated state\nabstract class Shape implements Drawable {\n    private final String name; // encapsulated: only accessible via getter\n\n    protected Shape(String name) {\n        this.name = name;\n    }\n\n    public String getName() {\n        return name;\n    }\n\n    // Abstract method forces subclasses to provide an implementation\n    public abstract double area();\n}\n\n// Concrete subclass: inheritance + polymorphism\nclass Circle extends Shape {\n    private final double radius;\n\n    public Circle(double radius) {\n        super(\"Circle\");\n        this.radius = radius;\n    }\n\n    @Override\n    public double area() {\n        return Math.PI * radius * radius;\n    }\n\n    @Override\n    public void draw() {\n        System.out.printf(\"Drawing %s with area %.2f%n\", getName(), area());\n    }\n}\n\npublic class ShapeDemo {\n    public static void main(String[] args) {\n        // Reference of interface type, object of concrete type\n        Drawable shape = new Circle(5.0);\n        shape.draw(); // dynamic dispatch resolves to Circle.draw()\n    }\n}",
            language="java",
        ),
        _section(
            "paragraph",
            "The interface Drawable declares a pure contract with no implementation. Shape is abstract, so it cannot be instantiated directly, and it encapsulates the name field behind a getter. Circle extends Shape and provides concrete area and draw methods. In main, the variable is typed as Drawable but holds a Circle instance. At JVM runtime, the call shape.draw() triggers dynamic dispatch: the JVM inspects the actual object's class, looks up draw in its method table, and invokes Circle.draw rather than any interface default. The Circle object lives on the heap while the local reference sits on the stack frame for main.",
        ),
        _section("heading", "How It Works Under the Hood", level=2),
        _section(
            "paragraph",
            "When you run javac, your source becomes .class files containing bytecode, a compact instruction set for a stack-based virtual machine. At launch, the class loader subsystem loads these classes lazily through a delegation hierarchy: the bootstrap loader handles core JDK classes, the platform loader handles extensions, and the application loader handles your code. Loading proceeds through linking, which includes verification (ensuring bytecode is type-safe and cannot corrupt memory), preparation (allocating static fields), and resolution of symbolic references. Initially the JVM interprets bytecode instruction by instruction, but the Just-In-Time compiler watches for hot methods executed frequently and compiles them to optimized native machine code, applying inlining, escape analysis, and loop unrolling. Memory is split into regions: the heap holds all objects and is managed by the garbage collector, while each thread gets its own stack of frames holding local variables and partial results. Modern collectors like G1 and ZGC divide the heap into regions and reclaim short-lived objects cheaply, since most objects die young.",
        ),
        _section(
            "code",
            "import java.util.*;\nimport java.util.stream.Collectors;\n\npublic class GenericsDemo {\n    // Generic method: type parameter T enforces compile-time type safety\n    public static <T extends Comparable<T>> T max(List<T> items) {\n        T best = items.get(0);\n        for (T item : items) {\n            if (item.compareTo(best) > 0) {\n                best = item;\n            }\n        }\n        return best;\n    }\n\n    public static void main(String[] args) {\n        // Type-safe collection: only Integer allowed, no casting required\n        List<Integer> numbers = new ArrayList<>(List.of(3, 9, 1, 7, 4));\n        System.out.println(\"Max: \" + max(numbers));\n\n        // Map with generic key/value types\n        Map<String, Integer> wordLengths = new HashMap<>();\n        for (String word : List.of(\"java\", \"jvm\", \"bytecode\")) {\n            wordLengths.put(word, word.length());\n        }\n\n        // Stream pipeline filtering with full type inference\n        List<String> longWords = wordLengths.entrySet().stream()\n                .filter(e -> e.getValue() > 3)\n                .map(Map.Entry::getKey)\n                .collect(Collectors.toList());\n        System.out.println(\"Words longer than 3: \" + longWords);\n    }\n}",
            language="java",
        ),
        _section(
            "info_box",
            "Pro Tip: The JVM performs escape analysis during JIT compilation. If it can prove an object never escapes the method where it was created, it may allocate that object on the stack instead of the heap, or eliminate the allocation entirely. This means idiomatic code that creates small short-lived objects is often far cheaper than developers fear, so you should optimize for readability first and let the JIT handle the rest.",
        ),
        _section("heading", "Common Patterns & Best Practices", level=2),
        _section(
            "paragraph",
            "Design patterns are reusable solutions to recurring problems. The Builder pattern constructs complex objects step by step through a fluent API, avoiding telescoping constructors with dozens of parameters and producing immutable results. The Factory pattern centralizes object creation behind a method so callers depend on an interface rather than concrete classes, which decouples construction from use and simplifies swapping implementations. The Strategy pattern encapsulates interchangeable algorithms behind a common interface, letting you select behavior at runtime, for example choosing a sorting or pricing strategy without conditional branching scattered through your code. The reasoning behind all three is the same: favor composition and clear contracts over rigid hierarchies, and isolate the parts of a system most likely to change so modifications stay localized and testable.",
        ),
        _section(
            "code",
            "// Builder pattern with a fluent API producing an immutable object\npublic class HttpRequest {\n    private final String url;\n    private final String method;\n    private final int timeoutMs;\n\n    private HttpRequest(Builder builder) {\n        this.url = builder.url;\n        this.method = builder.method;\n        this.timeoutMs = builder.timeoutMs;\n    }\n\n    public static Builder builder(String url) {\n        return new Builder(url);\n    }\n\n    public static class Builder {\n        private final String url;          // required\n        private String method = \"GET\";     // sensible default\n        private int timeoutMs = 5000;       // sensible default\n\n        private Builder(String url) {\n            this.url = url;\n        }\n\n        public Builder method(String method) {\n            this.method = method;\n            return this; // returning this enables chaining\n        }\n\n        public Builder timeoutMs(int timeoutMs) {\n            this.timeoutMs = timeoutMs;\n            return this;\n        }\n\n        public HttpRequest build() {\n            return new HttpRequest(this);\n        }\n    }\n\n    public static void main(String[] args) {\n        HttpRequest req = HttpRequest.builder(\"https://api.example.com\")\n                .method(\"POST\")\n                .timeoutMs(3000)\n                .build();\n        System.out.println(req.method + \" \" + req.url + \" (\" + req.timeoutMs + \"ms)\");\n    }\n}",
            language="java",
        ),
        _section(
            "warning_box",
            "Warning: The most common beginner mistake is dereferencing null and triggering a NullPointerException, closely followed by using raw types like List instead of List<String>. Raw types disable generic type checking and silently reintroduce unsafe casts that fail at runtime. Always parameterize your generics, prefer Optional for values that may be absent, and validate method arguments with Objects.requireNonNull at boundaries so failures surface early with clear messages.",
        ),
        _section("heading", "Real-World Application", level=2),
        _section(
            "paragraph",
            "Java powers some of the largest systems on the planet. Netflix runs much of its backend microservices architecture on the JVM, building open-source tooling like Hystrix and Zuul to handle billions of streaming requests with resilience and graceful degradation. Amazon relies heavily on Java across retail and AWS services where throughput and operational stability are paramount. LinkedIn built its real-time data pipeline foundation around Kafka, originally written in Scala and Java on the JVM, to move trillions of messages daily. These companies choose Java because its mature profiling tools, predictable garbage collection, and vast library ecosystem let large engineering teams ship and operate complex distributed systems safely at massive scale.",
        ),
        _section(
            "key_points",
            items=[
                "The JVM enables write-once-run-anywhere by compiling source to portable bytecode that any platform's virtual machine can execute.",
                "Encapsulation, inheritance, polymorphism, and abstraction are the four pillars that structure maintainable object-oriented Java systems.",
                "The JIT compiler profiles running code and compiles hot methods to optimized native code, often outperforming naive ahead-of-time assumptions.",
                "Garbage collection automates memory management; generational collectors exploit the fact that most objects die young to stay efficient.",
                "Generics provide compile-time type safety and eliminate unsafe casts, so always parameterize collections rather than using raw types.",
                "Design patterns like Builder, Factory, and Strategy isolate change and favor composition, keeping large codebases flexible and testable.",
            ],
        ),
        _section(
            "quiz",
            "In the HotSpot JVM, which statement best describes how generational garbage collection improves performance?",
            items=[
                "It allocates every object directly in old generation to minimize copying overhead.",
                "It exploits the weak generational hypothesis that most objects die young, collecting the young generation frequently and cheaply.",
                "It disables garbage collection entirely once the JIT compiles a method to native code.",
                "It runs a full heap scan on every allocation to guarantee no garbage ever accumulates.",
            ],
            answer=1,
            explanation="Generational GC is built on the weak generational hypothesis: empirically, the vast majority of objects become unreachable shortly after creation. By segregating recently allocated objects into a young generation and collecting that region frequently with a fast copying collector, the JVM reclaims most garbage cheaply, promoting only the survivors to the old generation, which is collected far less often.",
        ),
        _section(
            "quiz",
            "You need a collection that maintains insertion order, allows duplicates, and provides fast index-based random access for a read-heavy reporting feature. Which collection should you choose?",
            items=[
                "HashSet, because it guarantees the fastest possible lookups for all operations.",
                "ArrayList, because it preserves insertion order, permits duplicates, and offers O(1) index access.",
                "TreeMap, because it keeps elements sorted which is always preferable for reporting.",
                "LinkedList, because random access by index is its primary strength.",
            ],
            answer=1,
            explanation="ArrayList is backed by a contiguous array, giving constant-time get(index) access, preserving insertion order, and permitting duplicate elements, which matches the read-heavy, index-based requirement. HashSet forbids duplicates and has no index. TreeMap is a key-value structure that sorts keys, not what is needed. LinkedList has O(n) index access since it must traverse nodes sequentially.",
        ),
    ],
}

lesson2_dict = {
    "lessonId": "sample-2",
    "title": "Python for Everyone: Hands-on Exercise",
    "type": "exercise",
    "topicName": "Python for Everyone",
    "estimatedMinutes": 55,
    "xpReward": 100,
    "generated": True,
    "sections": [
        _section("heading", "What You'll Build", level=2),
        _section(
            "paragraph",
            "In this exercise you will build a fully functional command-line task manager in pure Python with no external dependencies. The application lets you add tasks, list them, mark them as complete, and delete them, with every change persisted to a JSON file on disk so your tasks survive between runs. You will use the argparse module from the standard library to create a clean subcommand interface that feels like a real CLI tool, similar to how git or docker expose subcommands. Along the way you will practice the dataclasses module for modeling structured data, file input and output, JSON serialization and deserialization, and defensive error handling. By the end you will have a portable, single-file utility you can actually use to manage your daily to-do list from the terminal.",
        ),
        _section("heading", "Prerequisites", level=2),
        _section(
            "key_points",
            items=[
                "Python 3.8 or newer installed, since the code uses dataclasses and modern type hints.",
                "pip available for optional extensions, though the core project needs no third-party packages.",
                "Comfort with basic Python syntax including functions, loops, and conditionals.",
                "Understanding of core data structures, specifically dictionaries and lists.",
                "A terminal or command prompt where you can run python commands.",
            ],
        ),
        _section("heading", "Setup & Project Structure", level=2),
        _section(
            "paragraph",
            "This project is intentionally minimal and lives in a single Python file plus a JSON data file that is created automatically on first use. Because everything relies only on the Python standard library, there is nothing to install and no virtual environment is strictly required, though using one is good hygiene. Keeping the entire program in one file makes it trivial to copy, share, and run anywhere Python is available. The JSON file acts as a lightweight embedded database, storing your tasks as a list of objects between executions.",
        ),
        _section(
            "code",
            "# Create the project directory and the main file\nmkdir task-manager\ncd task-manager\ntouch tasks.py\n\n# Final structure:\n# task-manager/\n#   tasks.py      <- all application logic\n#   tasks.json    <- auto-created on first run to persist data\n\n# (Optional) create and activate a virtual environment\npython3 -m venv .venv\nsource .venv/bin/activate   # On Windows: .venv\\Scripts\\activate",
            language="bash",
        ),
        _section("heading", "Step 1 — Foundation: Data Model & Storage", level=2),
        _section(
            "paragraph",
            "Each task is modeled with a dataclass that captures an id, a title, a completed flag, and a created timestamp. Dataclasses reduce boilerplate by auto-generating the constructor and other methods. For persistence we treat a single JSON file as our storage layer: loading reads the file into a list of dictionaries, and saving serializes the current list back to disk. We convert between dataclass instances and plain dictionaries because JSON only understands primitive types, lists, and objects.",
        ),
        _section(
            "code",
            "import json\nimport os\nfrom dataclasses import dataclass, asdict\nfrom datetime import datetime\n\nDATA_FILE = \"tasks.json\"\n\n\n@dataclass\nclass Task:\n    id: int\n    title: str\n    completed: bool\n    created_at: str\n\n\ndef load_tasks():\n    \"\"\"Load tasks from the JSON file, returning a list of dicts.\"\"\"\n    if not os.path.exists(DATA_FILE):\n        return []\n    try:\n        with open(DATA_FILE, \"r\", encoding=\"utf-8\") as f:\n            return json.load(f)\n    except json.JSONDecodeError:\n        # Corrupted or empty file: start fresh rather than crashing\n        return []\n\n\ndef save_tasks(tasks):\n    \"\"\"Persist the list of task dicts to the JSON file.\"\"\"\n    with open(DATA_FILE, \"w\", encoding=\"utf-8\") as f:\n        json.dump(tasks, f, indent=2)",
            language="python",
        ),
        _section("heading", "Step 2 — Core Logic: CRUD Operations", level=2),
        _section(
            "paragraph",
            "With storage in place we implement the four core operations. Adding a task assigns the next available id, builds a Task, appends it, and saves. Listing reads all tasks and prints them with a status marker. Completing a task finds it by id and flips its completed flag. Deleting removes the matching task by id. Each mutating operation reloads, modifies, and saves so the JSON file always reflects the latest state.",
        ),
        _section(
            "code",
            "def add_task(title):\n    tasks = load_tasks()\n    next_id = max((t[\"id\"] for t in tasks), default=0) + 1\n    task = Task(\n        id=next_id,\n        title=title,\n        completed=False,\n        created_at=datetime.now().isoformat(timespec=\"seconds\"),\n    )\n    tasks.append(asdict(task))\n    save_tasks(tasks)\n    print(f\"Added task #{next_id}: {title}\")\n\n\ndef list_tasks():\n    tasks = load_tasks()\n    if not tasks:\n        print(\"No tasks yet. Add one with: python tasks.py add 'My task'\")\n        return\n    for t in tasks:\n        mark = \"x\" if t[\"completed\"] else \" \"\n        print(f\"[{mark}] #{t['id']} {t['title']}  ({t['created_at']})\")\n\n\ndef complete_task(task_id):\n    tasks = load_tasks()\n    for t in tasks:\n        if t[\"id\"] == task_id:\n            t[\"completed\"] = True\n            save_tasks(tasks)\n            print(f\"Completed task #{task_id}\")\n            return\n    print(f\"No task found with id {task_id}\")\n\n\ndef delete_task(task_id):\n    tasks = load_tasks()\n    new_tasks = [t for t in tasks if t[\"id\"] != task_id]\n    if len(new_tasks) == len(tasks):\n        print(f\"No task found with id {task_id}\")\n        return\n    save_tasks(new_tasks)\n    print(f\"Deleted task #{task_id}\")",
            language="python",
        ),
        _section("heading", "Step 3 — Integration: CLI Interface", level=2),
        _section(
            "paragraph",
            "Now we wire the functions to a command-line interface using argparse. We create a top-level parser and attach subparsers, one per subcommand: add, list, complete, and delete. Each subparser declares the arguments it needs, such as a title string or an integer id. The main function parses the arguments, inspects which command was chosen, and dispatches to the matching function. This mirrors how professional CLI tools structure their interfaces.",
        ),
        _section(
            "code",
            "import argparse\n\n\ndef main():\n    parser = argparse.ArgumentParser(description=\"A simple JSON-backed task manager\")\n    subparsers = parser.add_subparsers(dest=\"command\", required=True)\n\n    add_p = subparsers.add_parser(\"add\", help=\"Add a new task\")\n    add_p.add_argument(\"title\", help=\"Title of the task\")\n\n    subparsers.add_parser(\"list\", help=\"List all tasks\")\n\n    done_p = subparsers.add_parser(\"complete\", help=\"Mark a task complete\")\n    done_p.add_argument(\"id\", type=int, help=\"Id of the task to complete\")\n\n    del_p = subparsers.add_parser(\"delete\", help=\"Delete a task\")\n    del_p.add_argument(\"id\", type=int, help=\"Id of the task to delete\")\n\n    args = parser.parse_args()\n\n    if args.command == \"add\":\n        add_task(args.title)\n    elif args.command == \"list\":\n        list_tasks()\n    elif args.command == \"complete\":\n        complete_task(args.id)\n    elif args.command == \"delete\":\n        delete_task(args.id)\n\n\nif __name__ == \"__main__\":\n    main()",
            language="python",
        ),
        _section("heading", "Step 4 — Testing & Verification", level=2),
        _section(
            "paragraph",
            "Run the program from the project directory and exercise each subcommand in sequence. Start by adding a couple of tasks, list them to confirm they persisted, mark one complete, list again to see the status change, then delete a task and verify it disappears. Inspect tasks.json directly to confirm the data is being written correctly.",
        ),
        _section(
            "code",
            "$ python tasks.py add \"Write the report\"\nAdded task #1: Write the report\n\n$ python tasks.py add \"Email the client\"\nAdded task #2: Email the client\n\n$ python tasks.py list\n[ ] #1 Write the report  (2026-05-29T10:15:00)\n[ ] #2 Email the client  (2026-05-29T10:15:12)\n\n$ python tasks.py complete 1\nCompleted task #1\n\n$ python tasks.py list\n[x] #1 Write the report  (2026-05-29T10:15:00)\n[ ] #2 Email the client  (2026-05-29T10:15:12)\n\n$ python tasks.py delete 2\nDeleted task #2",
            language="bash",
        ),
        _section(
            "warning_box",
            "Warning: The most common issue is a JSONDecodeError when tasks.json exists but is empty or corrupted, which is why load_tasks catches that exception and returns an empty list. A related pitfall is a FileNotFoundError on first run; the os.path.exists check prevents it. Never assume the data file is present and well-formed, always guard reads so a single bad file does not crash the entire tool.",
        ),
        _section(
            "info_box",
            "Extension Challenge: Extend the data model with a due_date and a priority field, then add a --sort flag to list tasks by priority or deadline. For a polished experience, install the rich library and render tasks in a colorized table with status icons, or build a full interactive TUI so users can navigate and toggle tasks without retyping commands.",
        ),
        _section(
            "key_points",
            items=[
                "JSON files serve as a simple, human-readable persistence layer for small applications without a database.",
                "The argparse module with subparsers builds professional multi-command CLIs similar to git and docker.",
                "Dataclasses model structured records concisely, and asdict converts them to JSON-serializable dictionaries.",
                "Robust file I/O wraps reads in try/except to survive missing or corrupted data files gracefully.",
                "The load-modify-save cycle keeps on-disk state consistent after every mutating operation.",
                "Keeping a tool dependency-free and single-file maximizes portability and ease of sharing.",
            ],
        ),
    ],
}

lesson3_dict = {
    "lessonId": "sample-3",
    "title": "React 19 & Ecosystem: Quiz: Test Your Knowledge",
    "type": "quiz",
    "topicName": "React 19",
    "estimatedMinutes": 20,
    "xpReward": 50,
    "generated": True,
    "sections": [
        _section("heading", "Knowledge Check — React 19 & Ecosystem", level=2),
        _section(
            "paragraph",
            "This quiz tests your understanding of modern React across several dimensions: core hooks like useState, useCallback, and useEffect, the concurrent rendering and automatic batching features introduced in recent versions, the Server Components model and its client boundary, and pragmatic state management choices ranging from Context to Redux. Read each scenario carefully, since several questions probe subtle behaviors that frequently trip up intermediate developers.",
        ),
        _section(
            "quiz",
            "What is the primary purpose of the useCallback hook in React?",
            items=[
                "To memoize the return value of an expensive computation so it is only recalculated when dependencies change.",
                "To return a memoized version of a callback function so its identity stays stable across renders unless dependencies change.",
                "To trigger a side effect after the component commits to the DOM.",
                "To replace useState for managing complex local component state.",
            ],
            answer=1,
            explanation="useCallback returns a memoized callback whose reference identity is preserved between renders as long as its dependency array is unchanged. This matters when passing callbacks to child components wrapped in React.memo or used in dependency arrays, because a new function identity on every render would defeat memoization. Memoizing a computed value is the job of useMemo, not useCallback.",
        ),
        _section(
            "quiz",
            "In React 18 and later, what happens to multiple state updates triggered inside a single event handler, including those after an await or inside promises and timeouts?",
            items=[
                "Each setState call triggers its own separate synchronous re-render immediately.",
                "They are automatically batched into a single re-render, even inside promises, timeouts, and native event handlers.",
                "Only updates inside React synthetic event handlers are batched; everything else re-renders separately.",
                "Batching must be manually enabled by wrapping every update in flushSync.",
            ],
            answer=1,
            explanation="React 18 introduced automatic batching, which groups multiple state updates into a single re-render regardless of where they originate, including promises, setTimeout, and native event handlers. Before React 18, batching only happened inside React event handlers. If you ever need an update applied synchronously and rendered immediately, you can opt out using flushSync, but the new default reduces unnecessary renders.",
        ),
        _section(
            "quiz",
            "What happens when a component wrapped in React.memo receives the same props it had on the previous render?",
            items=[
                "React always re-renders it anyway because memo only caches the DOM, not the render output.",
                "React skips re-rendering that component, reusing the previous render result based on a shallow prop comparison.",
                "React throws a warning because memo requires props to change on every render.",
                "React deep-compares all nested objects and only skips rendering if they are deeply equal.",
            ],
            answer=1,
            explanation="React.memo performs a shallow comparison of the incoming props against the previous props. If they are shallowly equal, React bails out of re-rendering and reuses the previous output, which can avoid wasted work. Note the comparison is shallow, so a new object or array reference with identical contents will still be treated as a change unless you supply a custom comparison function.",
        ),
        _section(
            "quiz",
            "When does the cleanup function returned by useEffect run?",
            items=[
                "Only once when the component is permanently unmounted, never between renders.",
                "Before the component re-runs the effect on dependency changes, and again when the component unmounts.",
                "Immediately after the effect body runs, in the same render commit.",
                "Synchronously before the browser paints, blocking the render.",
            ],
            answer=1,
            explanation="The cleanup function runs before the effect executes again due to changed dependencies, and once more when the component unmounts. This lifecycle lets you tear down subscriptions, timers, or listeners established by the previous effect run before a new one is set up, preventing leaks and stale handlers. It does not block painting; useEffect runs asynchronously after the commit.",
        ),
        _section(
            "quiz",
            "You have a list of 10,000 items that must be filtered as the user types. Which approach best maintains React performance?",
            items=[
                "Render all 10,000 filtered DOM nodes on every keystroke and rely on React being fast enough.",
                "Use list virtualization to render only visible rows, debounce the input, and memoize the filtering with useMemo.",
                "Move the entire list into a single useState object and call setState on every character.",
                "Wrap each of the 10,000 list items in its own useContext provider.",
            ],
            answer=1,
            explanation="Rendering thousands of DOM nodes is expensive regardless of React's speed. Virtualization libraries render only the rows currently in the viewport, drastically cutting DOM work. Debouncing the input avoids filtering on every keystroke, and useMemo caches the filtered result so it recomputes only when the query or source data changes. Together these techniques keep typing responsive at scale.",
        ),
        _section(
            "quiz",
            "When deciding between React Context and Redux for state management, which guidance is most accurate?",
            items=[
                "Always use Redux because Context cannot share state between components.",
                "Use Context for low-frequency, app-wide values like theme or locale; reach for Redux or similar when you have complex, high-frequency global state needing devtools, middleware, and predictable updates.",
                "Always use Context because Redux is deprecated in React 19.",
                "Use Redux only for component-local state and Context only for server data.",
            ],
            answer=1,
            explanation="Context excels at distributing relatively stable, app-wide values such as theme, locale, or the current user, avoiding prop drilling. However, Context re-renders all consumers when its value changes, so for large, frequently updated global state a dedicated library like Redux offers selective subscriptions, middleware, time-travel devtools, and a predictable update model that scales better.",
        ),
        _section(
            "quiz",
            "A useEffect runs once on mount with an empty dependency array but logs a state value that never updates even after the state changes. What is the cause?",
            items=[
                "React is broken and you should force a re-render with a key change.",
                "A stale closure: the effect captured the state value from the first render, and the empty dependency array prevents it from re-running with updated values.",
                "Empty dependency arrays are illegal and silently disable the effect entirely.",
                "State updates inside effects are always ignored by React.",
            ],
            answer=1,
            explanation="With an empty dependency array, the effect runs only on mount and closes over the variables as they existed during that first render. Because it never re-runs, it keeps referencing the original, now stale, value. The fix is to include the relevant state in the dependency array so the effect re-subscribes with fresh values, or to use a functional updater or ref to read the latest value.",
        ),
        _section(
            "quiz",
            "Which statement correctly describes the boundary between Server Components and Client Components in React?",
            items=[
                "Server Components can use useState and useEffect, while Client Components cannot.",
                "Server Components run only on the server and cannot use state, effects, or browser-only APIs; a Client Component, marked with the 'use client' directive, opts into interactivity and ships JavaScript to the browser.",
                "Client Components run exclusively on the server and never ship any JavaScript.",
                "There is no boundary; every component is both a Server and Client Component simultaneously.",
            ],
            answer=1,
            explanation="Server Components render on the server, can directly access data sources, and ship zero JavaScript for themselves, but they cannot use hooks like useState or useEffect or touch browser APIs. To add interactivity you create a Client Component with the 'use client' directive, which sends its code to the browser. The boundary lets you keep most of the tree on the server while isolating interactive islands on the client.",
        ),
        _section(
            "key_points",
            items=[
                "useCallback memoizes function identity while useMemo memoizes computed values; choosing the right one prevents wasted renders.",
                "React 18+ automatically batches state updates everywhere, including async callbacks, reducing unnecessary re-renders by default.",
                "React.memo skips re-rendering when a shallow prop comparison shows props are unchanged, but identical-content new references still count as changes.",
                "The useEffect cleanup function runs before each re-execution and on unmount, making it the right place to dispose subscriptions and timers.",
                "Performance at scale comes from virtualization, debouncing, and memoization rather than relying on React to render thousands of nodes cheaply.",
                "Server Components cannot use state or effects and ship no JavaScript, while 'use client' components opt into interactivity for the browser.",
            ],
        ),
    ],
}

lesson4_dict = {
    "lessonId": "sample-4",
    "title": "System Design: Deep Dive & Advanced Patterns",
    "type": "reading",
    "topicName": "System Design",
    "estimatedMinutes": 35,
    "xpReward": 75,
    "generated": True,
    "sections": [
        _section("heading", "Overview", level=2),
        _section(
            "paragraph",
            "System design is the discipline of architecting software systems that remain correct, fast, and available as load grows from hundreds to hundreds of millions of users. At FAANG scale, no single machine can hold the data or serve the traffic, so engineers distribute work across many nodes spread across data centers and continents. This introduces fundamental challenges absent from single-server applications: network partitions, partial failures, replication lag, and the impossibility of perfectly synchronized clocks. Effective system design is therefore the art of navigating trade-offs rather than finding one right answer. Should the system favor strong consistency or low latency? Should it scale by adding bigger machines or more of them? Should data be normalized for integrity or denormalized for read speed? Each decision optimizes some properties at the expense of others. Mastering this discipline means reasoning explicitly about those trade-offs, quantifying requirements like throughput and tail latency, and choosing architectures whose failure modes you can live with under real-world conditions.",
        ),
        _section("heading", "Core Concepts", level=2),
        _section(
            "paragraph",
            "The CAP theorem states that a distributed data store can simultaneously guarantee at most two of three properties when a network partition occurs: Consistency, Availability, and Partition tolerance. Consistency means every read receives the most recent write or an error, so all nodes agree on the data. Availability means every request receives a non-error response, even if it is not the latest data. Partition tolerance means the system keeps operating despite messages being dropped or delayed between nodes. Because network partitions are unavoidable in real distributed systems, partition tolerance is non-negotiable, so the practical choice during a partition is between consistency and availability. A banking ledger chooses consistency: it would rather reject a transaction than risk a double-spend, so it sacrifices availability under partition. A social media like counter chooses availability: showing a slightly stale count is perfectly acceptable, so it stays responsive and reconciles later. A DNS system likewise prioritizes availability with eventual consistency, since stale records resolving for a few seconds is far better than an outage.",
        ),
        _section(
            "code",
            "Distributed System: CAP choices annotated\n\n          +------------------+\n  write   |   Coordinator    |   read\n -------> |    (router)      | <-------\n          +------------------+\n             /     |      \\\n            v      v       v\n      +--------+ +--------+ +--------+\n      | Node A | | Node B | | Node C |   (replicas of same data)\n      +--------+ +--------+ +--------+\n\nScenario: a network partition splits Node C from A and B.\n\n[CP system  -> e.g. banking / etcd / ZooKeeper]\n  - On partition, the minority side (C) REFUSES reads/writes.\n  - Guarantees Consistency: no stale or conflicting data served.\n  - Sacrifices Availability for the partitioned node.\n\n[AP system  -> e.g. Cassandra / DynamoDB / DNS]\n  - On partition, ALL nodes keep serving reads and writes.\n  - Guarantees Availability: every request gets a response.\n  - Sacrifices Consistency: reads may be stale, reconciled later.\n\n[CA  -> only possible with NO partitions: a single node / LAN only]",
            language="text",
        ),
        _section(
            "paragraph",
            "The diagram shows three replicas behind a coordinator. When the partition isolates Node C, a CP system such as etcd or ZooKeeper makes the minority side reject operations so it never serves data that might disagree with the majority, choosing consistency over availability. An AP system such as Cassandra or DynamoDB instead lets every node keep answering, accepting that Node C may temporarily return stale values that are reconciled once the partition heals. True CA only exists when partitions cannot happen, which in practice means a single node or a single reliable LAN, not a real distributed deployment.",
        ),
        _section("heading", "How It Works Under the Hood", level=2),
        _section(
            "paragraph",
            "Scaling data beyond one machine requires sharding, which splits a dataset across multiple nodes so each holds only a slice. The naive approach of hashing a key modulo the node count breaks badly when nodes are added or removed, because the modulus changes and nearly every key remaps, triggering a massive reshuffle. Consistent hashing solves this by mapping both nodes and keys onto a fixed circular hash space, or ring. A key is assigned to the first node encountered moving clockwise from the key's position. When a node joins or leaves, only the keys in its immediate arc move, so roughly only one over N of the data relocates instead of nearly all of it. Production systems add virtual nodes, placing each physical node at many points on the ring, to smooth out uneven load distribution. Replication then stores each key on the next several nodes clockwise to survive failures. Replica sets coordinate which copy is the leader for writes and how followers catch up, while quorum reads and writes tune the balance between consistency and latency by requiring acknowledgment from a configurable subset of replicas.",
        ),
        _section(
            "code",
            "import hashlib\nimport bisect\n\n\nclass ConsistentHashRing:\n    def __init__(self, nodes=None, virtual_nodes=100):\n        self.virtual_nodes = virtual_nodes\n        self._ring = {}          # hash -> physical node\n        self._sorted_hashes = [] # sorted hash positions on the ring\n        for node in (nodes or []):\n            self.add_node(node)\n\n    def _hash(self, key):\n        return int(hashlib.md5(key.encode(\"utf-8\")).hexdigest(), 16)\n\n    def add_node(self, node):\n        for i in range(self.virtual_nodes):\n            h = self._hash(f\"{node}#{i}\")\n            self._ring[h] = node\n            bisect.insort(self._sorted_hashes, h)\n\n    def remove_node(self, node):\n        for i in range(self.virtual_nodes):\n            h = self._hash(f\"{node}#{i}\")\n            del self._ring[h]\n            self._sorted_hashes.remove(h)\n\n    def get_node(self, key):\n        if not self._ring:\n            return None\n        h = self._hash(key)\n        # Find first node clockwise from the key's position\n        idx = bisect.bisect(self._sorted_hashes, h) % len(self._sorted_hashes)\n        return self._ring[self._sorted_hashes[idx]]\n\n\nif __name__ == \"__main__\":\n    ring = ConsistentHashRing([\"node-a\", \"node-b\", \"node-c\"])\n    for key in [\"user:42\", \"user:99\", \"session:abc\", \"cart:7\"]:\n        print(f\"{key} -> {ring.get_node(key)}\")",
            language="python",
        ),
        _section(
            "info_box",
            "Pro Tip: Choose SQL when your workload needs strong transactional guarantees, complex multi-table joins, and a rigid schema, such as financial ledgers or inventory systems where correctness is paramount. Reach for NoSQL when you need horizontal write scalability, flexible or evolving schemas, and predictable single-key access patterns at massive scale, such as user session stores, event logs, or feeds. The deciding factor is rarely raw speed; it is your access patterns and consistency requirements.",
        ),
        _section("heading", "Common Patterns & Best Practices", level=2),
        _section(
            "paragraph",
            "Several patterns recur in large distributed systems. CQRS, Command Query Responsibility Segregation, splits the write model from the read model so each can be optimized and scaled independently, which shines when reads vastly outnumber writes. Event Sourcing stores state as an immutable append-only log of events rather than mutable rows, giving you a complete audit trail and the ability to rebuild state or replay history, at the cost of added complexity. The Circuit Breaker pattern protects a service from a failing dependency by tripping open after repeated failures and short-circuiting calls, preventing cascading failures and giving the downstream system time to recover. The Saga pattern coordinates a distributed transaction as a sequence of local transactions with compensating actions for rollback, used when a single ACID transaction across services is impossible. Use each only when its specific problem actually exists.",
        ),
        _section(
            "code",
            "import time\n\n\nclass CircuitBreaker:\n    def __init__(self, failure_threshold=5, recovery_timeout=30):\n        self.failure_threshold = failure_threshold\n        self.recovery_timeout = recovery_timeout\n        self.failures = 0\n        self.state = \"CLOSED\"      # CLOSED, OPEN, or HALF_OPEN\n        self.opened_at = None\n\n    def call(self, func, *args, **kwargs):\n        if self.state == \"OPEN\":\n            if time.time() - self.opened_at >= self.recovery_timeout:\n                self.state = \"HALF_OPEN\"  # allow a trial request\n            else:\n                raise RuntimeError(\"Circuit is OPEN: rejecting call fast\")\n\n        try:\n            result = func(*args, **kwargs)\n        except Exception:\n            self._record_failure()\n            raise\n        else:\n            self._record_success()\n            return result\n\n    def _record_failure(self):\n        self.failures += 1\n        if self.failures >= self.failure_threshold:\n            self.state = \"OPEN\"\n            self.opened_at = time.time()\n\n    def _record_success(self):\n        self.failures = 0\n        self.state = \"CLOSED\"\n\n\nif __name__ == \"__main__\":\n    breaker = CircuitBreaker(failure_threshold=3, recovery_timeout=10)\n\n    def flaky_dependency():\n        raise ConnectionError(\"downstream unavailable\")\n\n    for attempt in range(5):\n        try:\n            breaker.call(flaky_dependency)\n        except Exception as e:\n            print(f\"attempt {attempt}: {type(e).__name__} state={breaker.state}\")",
            language="python",
        ),
        _section(
            "warning_box",
            "Warning: Beware premature optimization and over-engineering. Splitting a small application into dozens of microservices before you have real scale problems multiplies operational complexity, introduces network latency and distributed failure modes, and slows your team without delivering value. Start with a well-structured monolith, measure actual bottlenecks, and extract services only when a specific scaling, ownership, or deployment need justifies the distributed-systems tax you are about to pay.",
        ),
        _section("heading", "Real-World Application", level=2),
        _section(
            "paragraph",
            "Twitter relies on aggressive fan-out and caching to deliver timelines, precomputing home timelines by pushing tweets into per-follower caches so reads are cheap, while handling celebrity accounts with millions of followers through a hybrid pull approach. Uber uses geospatial sharding and consistent hashing to match riders and drivers in real time, and embraces event-driven architectures with strong observability to coordinate trips across services. Netflix is famous for resilience engineering, popularizing the circuit breaker through Hystrix and chaos testing through Chaos Monkey, and serving content via a global CDN with microservices that degrade gracefully. Each company applies these patterns pragmatically to meet concrete latency and availability targets.",
        ),
        _section(
            "key_points",
            items=[
                "Partition tolerance is mandatory in real distributed systems, so CAP reduces to a practical choice between consistency and availability during partitions.",
                "Consistent hashing minimizes data movement when nodes join or leave, and virtual nodes smooth out load imbalance across the ring.",
                "Choose SQL for transactional integrity and complex joins; choose NoSQL for horizontal scale, flexible schemas, and key-based access.",
                "Circuit breakers prevent cascading failures by failing fast when a downstream dependency is unhealthy, then probing for recovery.",
                "CQRS, Event Sourcing, and Sagas solve specific problems and add complexity, so adopt them only when the problem genuinely exists.",
                "Start simple and let measured bottlenecks drive architectural complexity rather than speculatively over-engineering microservices upfront.",
            ],
        ),
        _section(
            "quiz",
            "A core banking system must guarantee that an account balance is never read or written inconsistently, even if it means rejecting requests during a network partition. Which consistency model should it adopt?",
            items=[
                "Eventual consistency, because availability matters more than correctness for money.",
                "Strong consistency (a CP system), accepting reduced availability during partitions to prevent inconsistent balances and double-spends.",
                "No consistency model is needed because partitions never happen in banks.",
                "Read-your-writes consistency only, with unrestricted concurrent writes from any node.",
            ],
            answer=1,
            explanation="A banking ledger cannot tolerate serving stale or conflicting balances, since that risks double-spending or losing funds. It must choose strong consistency, behaving as a CP system: during a network partition it will reject operations on the minority side rather than risk inconsistency. The trade-off is reduced availability under partition, which is acceptable because correctness of money is non-negotiable.",
        ),
        _section(
            "quiz",
            "You are designing a news feed serving 1,000,000 daily users where the same trending articles are requested repeatedly and the underlying content changes infrequently. Which caching strategy fits best?",
            items=[
                "No caching, querying the primary database directly on every request for maximum freshness.",
                "A cache-aside (lazy-loading) strategy with a CDN and a TTL, so hot content is served from cache and expires periodically to refresh.",
                "Write-through caching of every individual user's personalized state with no expiration ever.",
                "Caching only on the client with no server or CDN layer at all.",
            ],
            answer=1,
            explanation="With a large read-heavy audience hitting the same trending content, a cache-aside pattern combined with a CDN dramatically cuts database load and latency: on a miss you fetch from the database and populate the cache, and subsequent reads are served from cache. A TTL bounds staleness so content refreshes periodically, balancing freshness against the huge efficiency gains for frequently requested, slowly changing articles.",
        ),
    ],
}

lesson5_dict = {
    "lessonId": "sample-5",
    "title": "AWS Solutions Architect: Capstone Mini Project",
    "type": "project",
    "topicName": "AWS Solutions Architect",
    "estimatedMinutes": 60,
    "xpReward": 150,
    "generated": True,
    "sections": [
        _section("heading", "Project Overview", level=2),
        _section(
            "paragraph",
            "In this capstone you will build a production-grade serverless URL shortener on AWS, the kind of system that powers services like bit.ly. Users submit a long URL and receive a compact short code; visiting the short link redirects them to the original destination while the system records analytics. You will implement it entirely serverless using API Gateway as the HTTP front door, AWS Lambda for compute, DynamoDB for low-latency key-value storage, and S3 with CloudFront for a static frontend. Serverless is ideal here because traffic is spiky and unpredictable: you pay only for actual requests, scale automatically from zero to millions, and avoid managing servers. This project is portfolio-worthy because it touches every layer a Solutions Architect must master, including infrastructure as code, IAM least-privilege security, cost optimization, and observability, all in a realistic application you can demo and discuss in interviews.",
        ),
        _section("heading", "Learning Objectives", level=2),
        _section(
            "key_points",
            items=[
                "Write and deploy AWS Lambda functions in Python using the boto3 SDK to interact with other AWS services.",
                "Configure API Gateway REST endpoints, including routes, integrations, and usage plans for rate limiting.",
                "Model and query DynamoDB tables efficiently, using partition keys, conditional writes, and atomic update expressions.",
                "Apply IAM least-privilege roles and policies so each Lambda has only the permissions it strictly needs.",
                "Define all infrastructure as code with an AWS SAM template for repeatable, version-controlled deployments.",
                "Instrument the system with CloudWatch logs, metrics, alarms, and X-Ray tracing for production observability.",
            ],
        ),
        _section("heading", "Technical Requirements", level=2),
        _section(
            "key_points",
            items=[
                "Generate collision-resistant short codes and persist the mapping from short code to original URL.",
                "Redirect a short link to its destination using an HTTP 301 or 302 response.",
                "Track per-link analytics, including total click count and last-accessed timestamp.",
                "Support optional link expiration using a DynamoDB TTL attribute that auto-deletes stale items.",
                "Enforce rate limiting on the create endpoint via API Gateway usage plans and API keys.",
                "Achieve a p99 latency under 100 milliseconds for the redirect path.",
                "Validate and sanitize all user input, rejecting malformed or non-HTTP URLs.",
                "Provision all resources through infrastructure as code with least-privilege IAM.",
            ],
        ),
        _section("heading", "Architecture & Design", level=2),
        _section(
            "paragraph",
            "The architecture follows a classic serverless request flow. A static frontend, hosted in an S3 bucket and served globally through a CloudFront distribution for low latency and HTTPS, lets users submit URLs. Create and redirect requests hit Amazon API Gateway, which routes them to dedicated Lambda functions. The create Lambda generates a short code, writes the mapping into a DynamoDB table keyed by short code, and returns the short URL. The redirect Lambda reads the item by short code and returns a redirect response, while asynchronously incrementing the click counter. DynamoDB is chosen over a relational database because the access pattern is a simple key lookup at very high throughput with single-digit-millisecond latency, and its TTL feature handles expiry automatically. Each Lambda assumes a narrowly scoped IAM role granting only the specific DynamoDB actions it needs. Rate limiting lives at API Gateway via usage plans, keeping abuse out of compute entirely, and the design favors managed services so there are no servers to patch or scale manually.",
        ),
        _section(
            "code",
            "AWSTemplateFormatVersion: '2010-09-09'\nTransform: AWS::Serverless-2016-10-31\nDescription: Serverless URL shortener\n\nGlobals:\n  Function:\n    Runtime: python3.12\n    Timeout: 10\n    MemorySize: 256\n    Tracing: Active\n    Environment:\n      Variables:\n        TABLE_NAME: !Ref UrlTable\n\nResources:\n  UrlTable:\n    Type: AWS::DynamoDB::Table\n    Properties:\n      TableName: url-shortener\n      BillingMode: PAY_PER_REQUEST\n      AttributeDefinitions:\n        - AttributeName: shortCode\n          AttributeType: S\n      KeySchema:\n        - AttributeName: shortCode\n          KeyType: HASH\n      TimeToLiveSpecification:\n        AttributeName: expiresAt\n        Enabled: true\n\n  CreateUrlFunction:\n    Type: AWS::Serverless::Function\n    Properties:\n      Handler: create.handler\n      CodeUri: src/\n      Policies:\n        - DynamoDBCrudPolicy:\n            TableName: !Ref UrlTable\n      Events:\n        CreateApi:\n          Type: Api\n          Properties:\n            Path: /urls\n            Method: post\n\n  RedirectFunction:\n    Type: AWS::Serverless::Function\n    Properties:\n      Handler: redirect.handler\n      CodeUri: src/\n      Policies:\n        - DynamoDBCrudPolicy:\n            TableName: !Ref UrlTable\n      Events:\n        RedirectApi:\n          Type: Api\n          Properties:\n            Path: /{shortCode}\n            Method: get\n\nOutputs:\n  ApiUrl:\n    Description: Base URL of the API\n    Value: !Sub \"https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod\"",
            language="yaml",
        ),
        _section("heading", "Phase 1 — Core Implementation", level=2),
        _section(
            "paragraph",
            "Phase 1 delivers the minimum viable shortener: a DynamoDB table, a create function, and a redirect function. The create Lambda accepts a JSON body with a long URL, generates a short code, stores the mapping, and returns the short URL. The redirect Lambda looks up a short code from the path and issues an HTTP redirect to the original URL, returning 404 when the code is unknown. This gives you an end-to-end working flow you can deploy and exercise before layering on advanced features.",
        ),
        _section(
            "code",
            "# create.py\nimport json\nimport os\nimport secrets\nimport string\nimport boto3\n\ndynamodb = boto3.resource(\"dynamodb\")\ntable = dynamodb.Table(os.environ[\"TABLE_NAME\"])\nALPHABET = string.ascii_letters + string.digits\n\n\ndef generate_code(length=7):\n    return \"\".join(secrets.choice(ALPHABET) for _ in range(length))\n\n\ndef handler(event, context):\n    body = json.loads(event.get(\"body\") or \"{}\")\n    long_url = body.get(\"url\")\n    if not long_url:\n        return {\"statusCode\": 400, \"body\": json.dumps({\"error\": \"url is required\"})}\n\n    short_code = generate_code()\n    table.put_item(\n        Item={\"shortCode\": short_code, \"longUrl\": long_url, \"clicks\": 0},\n        ConditionExpression=\"attribute_not_exists(shortCode)\",\n    )\n    return {\n        \"statusCode\": 201,\n        \"headers\": {\"Content-Type\": \"application/json\"},\n        \"body\": json.dumps({\"shortCode\": short_code}),\n    }\n\n\n# redirect.py\nimport os\nimport boto3\n\ndynamodb = boto3.resource(\"dynamodb\")\ntable = dynamodb.Table(os.environ[\"TABLE_NAME\"])\n\n\ndef handler(event, context):\n    short_code = event[\"pathParameters\"][\"shortCode\"]\n    result = table.get_item(Key={\"shortCode\": short_code})\n    item = result.get(\"Item\")\n    if not item:\n        return {\"statusCode\": 404, \"body\": \"Not found\"}\n    return {\n        \"statusCode\": 302,\n        \"headers\": {\"Location\": item[\"longUrl\"]},\n        \"body\": \"\",\n    }",
            language="python",
        ),
        _section("heading", "Phase 2 — Feature Completion", level=2),
        _section(
            "paragraph",
            "Phase 2 adds the features that make the shortener genuinely useful. Analytics tracking records every click by atomically incrementing a counter and stamping the last-accessed time, done with a DynamoDB update expression so concurrent clicks never lose counts. Link expiration uses a TTL attribute holding a Unix timestamp; DynamoDB automatically deletes expired items, keeping the table clean at no cost. Rate limiting is enforced at API Gateway through usage plans tied to API keys, throttling abusive clients before they ever reach Lambda.",
        ),
        _section(
            "code",
            "# analytics.py\nimport os\nimport time\nimport boto3\n\ndynamodb = boto3.resource(\"dynamodb\")\ntable = dynamodb.Table(os.environ[\"TABLE_NAME\"])\n\n\ndef record_click(short_code):\n    \"\"\"Atomically increment the click counter and update last-accessed time.\"\"\"\n    table.update_item(\n        Key={\"shortCode\": short_code},\n        UpdateExpression=\"SET clicks = if_not_exists(clicks, :zero) + :inc, \"\n                         \"lastAccessed = :now\",\n        ExpressionAttributeValues={\n            \":inc\": 1,\n            \":zero\": 0,\n            \":now\": int(time.time()),\n        },\n        ConditionExpression=\"attribute_exists(shortCode)\",\n    )\n\n\ndef create_with_expiry(short_code, long_url, ttl_days=30):\n    expires_at = int(time.time()) + ttl_days * 86400\n    table.put_item(\n        Item={\n            \"shortCode\": short_code,\n            \"longUrl\": long_url,\n            \"clicks\": 0,\n            \"expiresAt\": expires_at,  # DynamoDB TTL auto-deletes after this\n        },\n        ConditionExpression=\"attribute_not_exists(shortCode)\",\n    )",
            language="python",
        ),
        _section("heading", "Phase 3 — Polish & Production Readiness", level=2),
        _section(
            "paragraph",
            "Phase 3 hardens the system for production. You add strict input validation to reject anything that is not a well-formed HTTP or HTTPS URL, preventing open-redirect abuse. Error handling wraps all logic so unexpected failures return clean 4xx or 5xx responses instead of leaking stack traces. Structured JSON logging emits machine-parseable records to CloudWatch, and you create CloudWatch alarms on error rate and latency plus enable X-Ray tracing to diagnose bottlenecks. Cost optimization comes from right-sizing Lambda memory and using DynamoDB on-demand billing.",
        ),
        _section(
            "code",
            "import json\nimport logging\nfrom urllib.parse import urlparse\n\nlogger = logging.getLogger()\nlogger.setLevel(logging.INFO)\n\n\ndef is_valid_url(url):\n    try:\n        parsed = urlparse(url)\n        return parsed.scheme in (\"http\", \"https\") and bool(parsed.netloc)\n    except (ValueError, AttributeError):\n        return False\n\n\ndef log_event(level, message, **fields):\n    \"\"\"Emit a structured JSON log line for CloudWatch Insights queries.\"\"\"\n    record = {\"level\": level, \"message\": message, **fields}\n    logger.info(json.dumps(record))\n\n\ndef handler(event, context):\n    request_id = context.aws_request_id\n    try:\n        body = json.loads(event.get(\"body\") or \"{}\")\n        url = body.get(\"url\", \"\")\n\n        if not is_valid_url(url):\n            log_event(\"WARN\", \"invalid url rejected\", requestId=request_id, url=url)\n            return {\n                \"statusCode\": 400,\n                \"body\": json.dumps({\"error\": \"A valid http(s) URL is required\"}),\n            }\n\n        log_event(\"INFO\", \"url accepted\", requestId=request_id)\n        return {\"statusCode\": 201, \"body\": json.dumps({\"status\": \"created\"})}\n\n    except json.JSONDecodeError:\n        log_event(\"WARN\", \"malformed json body\", requestId=request_id)\n        return {\"statusCode\": 400, \"body\": json.dumps({\"error\": \"Invalid JSON\"})}\n    except Exception as exc:\n        log_event(\"ERROR\", \"unhandled exception\", requestId=request_id, detail=str(exc))\n        return {\"statusCode\": 500, \"body\": json.dumps({\"error\": \"Internal server error\"})}",
            language="python",
        ),
        _section("heading", "Evaluation Rubric", level=2),
        _section(
            "key_points",
            items=[
                "Architecture: services are composed cleanly with appropriate separation of concerns and justified design decisions.",
                "Security and IAM: each Lambda uses a least-privilege role; no wildcard permissions or hardcoded credentials exist.",
                "Error handling: all failure paths return clean status codes and never leak stack traces to clients.",
                "Cost awareness: Lambda memory is right-sized, DynamoDB billing mode fits the workload, and TTL prevents unbounded growth.",
                "Testing: create, redirect, expiry, and analytics paths are verified, including invalid-input and not-found cases.",
                "Monitoring: CloudWatch logs are structured, alarms cover error rate and latency, and X-Ray tracing is enabled.",
                "Infrastructure as code: the entire stack is reproducible from the SAM template with no manual console steps.",
            ],
        ),
        _section(
            "info_box",
            "Extension Challenges: Map a custom domain to the API and CloudFront distribution using Route 53 and ACM certificates for branded short links. Generate a QR code for each short URL on creation and store it in S3. For an advanced challenge, run A/B testing or geolocation-based routing at the edge with Lambda@Edge, redirecting different user segments to different destinations while keeping latency minimal.",
        ),
    ],
}

lessons = [lesson1_dict, lesson2_dict, lesson3_dict, lesson4_dict, lesson5_dict]
