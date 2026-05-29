# Auto-generated cricket-personalised AI upskilling lessons.
# Structure rule: a technical `paragraph` is explained first, then an `analogy`
# section maps that exact concept to cricket. Code blocks remain purely technical.

lesson1_dict = {
    "lessonId": "cricket2-1",
    "title": "Java Mastery: Introduction & Core Concepts",
    "type": "reading",
    "topicName": "Java",
    "estimatedMinutes": 30,
    "xpReward": 75,
    "generated": True,
    "sections": [
        {"type": "heading", "content": "Overview", "level": 2},
        {"type": "paragraph", "content": (
            "Java was created at Sun Microsystems by James Gosling and released in 1995 with the "
            "guiding promise of 'write once, run anywhere' (WORA). Rather than compiling source "
            "directly to a single CPU's native instructions, the Java compiler (javac) emits an "
            "intermediate, architecture-neutral format called bytecode stored in .class files. "
            "That bytecode is executed by the Java Virtual Machine (JVM), an abstract computing "
            "machine for which concrete implementations exist on Windows, Linux, macOS, and embedded "
            "devices. Because the bytecode contract is fixed while each JVM is platform-specific, the "
            "same compiled artifact runs unchanged across operating systems. This portability, combined "
            "with strong static typing, automatic memory management, and a vast standard library, is why "
            "Java dominates enterprise computing: banking and trading systems prize its reliability and "
            "tooling, Android historically built its application layer on Java, and the Spring ecosystem "
            "makes large-scale server development productive and maintainable."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: the Laws of Cricket are identical whether you play at Lord's "
            "or the MCG. The laws are the bytecode specification, fixed and authoritative, while each "
            "ground with its own pitch, boundary, and outfield is a different JVM implementation. A "
            "team that knows the laws can walk onto any ground and play the same game, just as a .class "
            "file runs unchanged on any JVM. The ground varies; the rules of play do not."
        )},
        {"type": "heading", "content": "Core Concepts", "level": 2},
        {"type": "paragraph", "content": (
            "Java is fundamentally object-oriented. A class is a blueprint that declares fields (state) and "
            "methods (behaviour); an object is a concrete instance of that blueprint living on the heap. "
            "OOP in Java rests on four pillars. Encapsulation hides internal fields behind private access and "
            "exposes controlled getters/setters; without it any code could mutate state into invalid "
            "configurations, making bugs untraceable. Inheritance lets a subclass reuse and extend a parent "
            "via 'extends'; without it shared behaviour would be copy-pasted, drifting out of sync. "
            "Polymorphism lets a single method call dispatch to different implementations through method "
            "overriding; without it callers would need giant switch statements on type, violating the "
            "open/closed principle. Abstraction, via abstract classes and interfaces, defines a contract "
            "without committing to implementation; without it callers couple tightly to concrete classes and "
            "lose the freedom to swap implementations. Together these pillars produce code that is safe to "
            "change, easy to extend, and resistant to accidental corruption of state."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: encapsulation is a batsman's private technique. Spectators only "
            "ever see the shots played, never the grip and footwork mechanics hidden behind them. Inheritance "
            "is a T20 specialist who extends the base role of 'cricketer' while adding power-hitting skills. "
            "Polymorphism is the captain shouting 'bowl!' at any bowler: a fast bowler, a leg-spinner, and a "
            "medium-pacer all answer the same call but execute completely differently."
        )},
        {"type": "code", "language": "java", "content": (
            "// Abstraction: Shape defines a contract but no concrete area calculation.\n"
            "abstract class Shape {\n"
            "    // Subclasses MUST provide an implementation; Shape cannot be instantiated.\n"
            "    abstract double area();\n"
            "\n"
            "    // Shared, concrete behaviour inherited by every subclass.\n"
            "    String describe() {\n"
            "        return getClass().getSimpleName() + \" area=\" + area();\n"
            "    }\n"
            "}\n"
            "\n"
            "class Rectangle extends Shape {\n"
            "    private final double width;\n"
            "    private final double height;\n"
            "\n"
            "    Rectangle(double width, double height) {\n"
            "        this.width = width;\n"
            "        this.height = height;\n"
            "    }\n"
            "\n"
            "    @Override\n"
            "    double area() { return width * height; }\n"
            "}\n"
            "\n"
            "class Circle extends Shape {\n"
            "    private final double radius;\n"
            "\n"
            "    Circle(double radius) { this.radius = radius; }\n"
            "\n"
            "    @Override\n"
            "    double area() { return Math.PI * radius * radius; }\n"
            "}\n"
            "\n"
            "public class Demo {\n"
            "    public static void main(String[] args) {\n"
            "        // A list typed to the abstraction holds any concrete subclass.\n"
            "        java.util.List<Shape> shapes = java.util.List.of(\n"
            "            new Rectangle(3, 4),\n"
            "            new Circle(2)\n"
            "        );\n"
            "        // Polymorphism: the correct area() runs for each element at runtime.\n"
            "        for (Shape shape : shapes) {\n"
            "            System.out.println(shape.describe());\n"
            "        }\n"
            "    }\n"
            "}"
        )},
        {"type": "paragraph", "content": (
            "Declaring Shape 'abstract' prevents direct instantiation, because an abstract method has no body "
            "and the compiler cannot allow a half-defined object to exist. Each subclass supplies its own "
            "area(), marked @Override. When the loop calls shape.describe(), which in turn calls area(), the "
            "JVM does not pick the method by the declared type Shape; it consults the object's runtime class "
            "via the virtual method table (vtable), a per-class array of method pointers, and dispatches to "
            "Rectangle.area() or Circle.area() accordingly. This is dynamic dispatch. The List<Shape> works "
            "because every element honours the Shape contract, so the caller can treat them uniformly without "
            "ever knowing the concrete type."
        )},
        {"type": "heading", "content": "How It Works Under the Hood", "level": 2},
        {"type": "paragraph", "content": (
            "The Java pipeline begins with source code compiled by javac into platform-neutral .class "
            "bytecode. At runtime a class loader reads those .class files, verifies the bytecode, links and "
            "initializes the classes, and loads them into the JVM. The bytecode initially runs in an "
            "interpreter, but HotSpot's Just-In-Time (JIT) compiler watches for 'hot' methods executed "
            "frequently and compiles them to optimized native machine code, using tiered compilation: the C1 "
            "client compiler gives fast startup with light optimization, while the C2 server compiler applies "
            "aggressive optimizations like inlining and escape analysis for peak throughput. Memory is split "
            "into the heap, where objects are allocated and reclaimed by the garbage collector across "
            "generations (Eden and two Survivor spaces in the young generation, then the Old Gen for "
            "long-lived objects), and the stack, which holds per-method frames containing local variables and "
            "operand data. GC pauses matter because stop-the-world collections briefly freeze application "
            "threads, which is unacceptable for latency-sensitive systems like trading engines, driving the use "
            "of low-pause collectors such as G1, ZGC, and Shenandoah."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: a batsman starts the innings cautiously, playing himself in and "
            "reading the pitch ball by ball, exactly like bytecode running in interpreted mode. After twenty "
            "balls he has read the bowlers and conditions perfectly and begins striking freely and "
            "efficiently, just as the JIT compiler turns hot code into optimized native instructions. A GC "
            "pause is the drinks break: a brief, deliberate interruption that everyone accepts because it keeps "
            "the side fresh for the long game."
        )},
        {"type": "code", "language": "java", "content": (
            "import java.util.*;\n"
            "import java.util.stream.*;\n"
            "\n"
            "public class WordStats {\n"
            "    public static void main(String[] args) {\n"
            "        List<String> words = List.of(\n"
            "            \"alpha\", \"beta\", \"alpha\", \"gamma\", \"beta\", \"alpha\"\n"
            "        );\n"
            "\n"
            "        // Count occurrences into a Map<word, frequency>.\n"
            "        Map<String, Integer> frequencies = new HashMap<>();\n"
            "        for (String word : words) {\n"
            "            frequencies.merge(word, 1, Integer::sum);\n"
            "        }\n"
            "\n"
            "        // Keep only words seen more than once, sorted by descending count.\n"
            "        List<Map.Entry<String, Integer>> top = frequencies.entrySet().stream()\n"
            "            .filter(entry -> entry.getValue() > 1)\n"
            "            .sorted(Comparator.comparing(Map.Entry<String, Integer>::getValue).reversed())\n"
            "            .collect(Collectors.toList());\n"
            "\n"
            "        top.forEach(entry ->\n"
            "            System.out.println(entry.getKey() + \" -> \" + entry.getValue()));\n"
            "    }\n"
            "}"
        )},
        {"type": "info_box", "content": (
            "Pro Tip: Use ArrayList over LinkedList for 95% of use cases. ArrayList's O(1) random access and "
            "cache-friendly contiguous memory layout outperform LinkedList's O(n) traversal cost. Only reach "
            "for LinkedList when you genuinely need O(1) insertions or removals at both ends."
        )},
        {"type": "heading", "content": "Common Patterns & Best Practices", "level": 2},
        {"type": "paragraph", "content": (
            "Three creational and behavioural patterns recur constantly in Java. The Builder pattern constructs "
            "complex objects step by step instead of through telescoping constructors with many overloaded "
            "parameter lists; it exists because such constructors are error-prone and unreadable, and a builder "
            "can validate required fields in build() to prevent objects ever existing in an invalid state. The "
            "Factory Method pattern creates objects through a method rather than a direct constructor, so "
            "callers depend on an abstraction and the concrete type chosen can vary; it exists to decouple "
            "object creation from object use. The Strategy pattern encapsulates interchangeable algorithms "
            "behind a common interface so behaviour can be swapped at runtime; it exists to honour the "
            "open/closed principle, letting you add new strategies without modifying existing code. Each pattern "
            "trades a little extra structure for substantial gains in safety, flexibility, and maintainability."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: assembling a playing XI is a Builder, not a single constructor call. "
            "You pick the captain first, then set the batting order, then add the bowling attack, then finalize "
            "the wicketkeeper, and each step validates that the squad is still legal before the next. The "
            "build() call is the official team announcement: once made, you have a complete, valid eleven ready "
            "to take the field."
        )},
        {"type": "code", "language": "java", "content": (
            "public final class DatabaseConfig {\n"
            "    private final String host;        // required\n"
            "    private final int port;           // required\n"
            "    private final int timeout;        // optional\n"
            "    private final int maxConnections; // optional\n"
            "\n"
            "    private DatabaseConfig(Builder builder) {\n"
            "        this.host = builder.host;\n"
            "        this.port = builder.port;\n"
            "        this.timeout = builder.timeout;\n"
            "        this.maxConnections = builder.maxConnections;\n"
            "    }\n"
            "\n"
            "    public static class Builder {\n"
            "        private String host;            // required\n"
            "        private int port = -1;          // required, sentinel = unset\n"
            "        private int timeout = 30_000;   // sensible default\n"
            "        private int maxConnections = 10;// sensible default\n"
            "\n"
            "        public Builder host(String host) { this.host = host; return this; }\n"
            "        public Builder port(int port) { this.port = port; return this; }\n"
            "        public Builder timeout(int timeout) { this.timeout = timeout; return this; }\n"
            "        public Builder maxConnections(int max) { this.maxConnections = max; return this; }\n"
            "\n"
            "        public DatabaseConfig build() {\n"
            "            // Validate required fields before constructing the object.\n"
            "            if (host == null || host.isBlank()) {\n"
            "                throw new IllegalStateException(\"host is required\");\n"
            "            }\n"
            "            if (port < 0) {\n"
            "                throw new IllegalStateException(\"port is required\");\n"
            "            }\n"
            "            return new DatabaseConfig(this);\n"
            "        }\n"
            "    }\n"
            "\n"
            "    public static void main(String[] args) {\n"
            "        DatabaseConfig config = new DatabaseConfig.Builder()\n"
            "            .host(\"db.internal\")\n"
            "            .port(5432)\n"
            "            .timeout(5_000)\n"
            "            .build();\n"
            "        System.out.println(\"Configured \" + config.host + \":\" + config.port);\n"
            "    }\n"
            "}"
        )},
        {"type": "warning_box", "content": (
            "Warning: Never use raw types (List instead of List<String>). You lose compile-time type safety and "
            "invite ClassCastException at runtime. Without the generic parameter the compiler cannot catch type "
            "errors, turning what would be a compile-time failure into a production runtime crash."
        )},
        {"type": "heading", "content": "Real-World Application", "level": 2},
        {"type": "paragraph", "content": (
            "Java runs at the core of modern infrastructure. Spring Boot powers Netflix's API gateway and "
            "countless backend microservices, where its dependency injection and auto-configuration accelerate "
            "delivery. The Android SDK is built on Java and Kotlin, both targeting the same bytecode-style "
            "runtime. LinkedIn relies on Java across much of its data infrastructure, and Apache Kafka, the "
            "de-facto event-streaming platform, is written in Java and Scala on the JVM. The JVM's mature "
            "garbage collectors and rich observability ecosystem, including JMX, Micrometer, and GraalVM native "
            "image for fast-starting binaries, make it the default choice for high-throughput, "
            "long-running enterprise systems."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: Test cricket has roughly 150 years of refinement, with detailed laws, "
            "professional umpiring standards, and DRS technology for edge cases. Java's three-decade ecosystem "
            "is the same accumulated maturity. There is a battle-tested library, profiler, or framework for "
            "almost every problem you will face, just as Test cricket has an established protocol for nearly "
            "every situation that can arise on the field."
        )},
        {"type": "key_points", "items": [
            "Bytecode is the portability contract: javac targets the JVM specification, not a specific CPU, enabling write-once-run-anywhere.",
            "Dynamic dispatch resolves overridden methods through the runtime object's vtable, not the declared variable type.",
            "HotSpot's tiered JIT uses C1 for fast startup and C2 for aggressive throughput optimization on hot methods.",
            "The heap is generational (Eden, Survivor, Old Gen); short-lived objects die young, minimizing expensive Old Gen collections.",
            "Prefer ArrayList for its O(1) indexed access and cache locality; reserve LinkedList for frequent end-insertions only.",
            "Builders validate required fields in build(), guaranteeing objects never exist in an invalid intermediate state."
        ]},
        {"type": "quiz",
         "content": "Java's JVM executes bytecode rather than native code directly. What is the PRIMARY advantage of this design?",
         "items": [
             "Platform independence",
             "Faster than native code",
             "No need for garbage collection",
             "Smaller file size"
         ],
         "answer": 0,
         "explanation": (
             "Platform independence is correct: one bytecode artifact runs on any JVM regardless of OS or CPU. "
             "'Faster than native code' is wrong because interpreted and even JIT-compiled code carries overhead "
             "and rarely beats well-tuned native code; speed is not the goal here. 'No need for garbage "
             "collection' is unrelated, since GC is a separate JVM feature. 'Smaller file size' is wrong because "
             "bytecode size is not the design's purpose and varies by program."
         )},
        {"type": "quiz",
         "content": "You need a collection that eliminates duplicates and provides O(1) average-case lookup. Which Java collection is the correct choice?",
         "items": [
             "ArrayList",
             "LinkedList",
             "HashSet",
             "TreeMap"
         ],
         "answer": 2,
         "explanation": (
             "HashSet is correct: it rejects duplicates and offers amortized O(1) contains/add via hashing. "
             "ArrayList allows duplicates and has O(n) contains because it scans linearly. LinkedList similarly "
             "permits duplicates and is O(n) for lookup. TreeMap is a key-value map (not a set) with O(log n) "
             "operations because it maintains sorted order via a red-black tree, so it neither matches the set "
             "semantics nor the O(1) lookup requirement."
         )}
    ]
}

lesson2_dict = {
    "lessonId": "cricket2-2",
    "title": "Python for Everyone: Hands-on Exercise",
    "type": "exercise",
    "topicName": "Python",
    "estimatedMinutes": 55,
    "xpReward": 100,
    "generated": True,
    "sections": [
        {"type": "heading", "content": "What You'll Build", "level": 2},
        {"type": "paragraph", "content": (
            "You will build a command-line task manager in pure Python with no external dependencies. The tool "
            "lets you add tasks with priorities, list tasks filtered by completion status, mark tasks complete, "
            "delete tasks, and persist everything to a JSON file so your work survives between runs. Along the "
            "way you will practise modelling data with dataclasses, performing JSON input and output through the "
            "standard library, building a clean command-line interface with argparse subcommands, and "
            "structuring logic into small, pure, testable functions. By the end you will have a working, "
            "extensible CLI and a solid grasp of how real Python applications separate data, logic, and "
            "input/output concerns."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: this is a team's match-preparation checklist. Net sessions, fielding "
            "drills, and video analysis are the tasks, ticked off as each is completed, and the whole plan is "
            "saved in the captain's notebook (the JSON file) so nothing is forgotten between training days. The "
            "next morning the captain reopens the notebook and continues exactly where the squad left off."
        )},
        {"type": "heading", "content": "Prerequisites", "level": 2},
        {"type": "key_points", "items": [
            "Python 3.8 or newer installed (dataclasses and f-strings are required).",
            "Comfort reading and writing dicts and lists.",
            "Ability to define functions and pass arguments.",
            "pip available (not needed for this project, but a good habit to verify your toolchain).",
            "A text editor or IDE such as VS Code or PyCharm."
        ]},
        {"type": "heading", "content": "Setup & Project Structure", "level": 2},
        {"type": "paragraph", "content": (
            "The project is intentionally minimal: a single source file, task_manager.py, contains the data "
            "model, the core logic, and the CLI entry point. A tasks.json file is created automatically on the "
            "first write and stores all task records as a JSON array. There are no third-party packages and no "
            "build step, so the project runs anywhere a supported Python interpreter exists. Keeping everything "
            "in one file keeps the focus on concepts rather than packaging."
        )},
        {"type": "code", "language": "bash", "content": (
            "mkdir task_manager && cd task_manager\n"
            "touch task_manager.py\n"
            "\n"
            "# Expected tree after the project is complete:\n"
            "# task_manager/\n"
            "# ├── task_manager.py   # data model + logic + CLI\n"
            "# └── tasks.json        # auto-created on first add"
        )},
        {"type": "heading", "content": "Step 1 — Foundation: Data Model & File Persistence", "level": 2},
        {"type": "paragraph", "content": (
            "Dataclasses auto-generate the boilerplate __init__, __repr__, and __eq__ methods from the field "
            "declarations, so you describe the shape of your data once and get correct constructors and "
            "comparisons for free. JSON is chosen for persistence because it is human-readable, diff-friendly, "
            "and supported natively by Python's json module with zero dependencies. The load_tasks and "
            "save_tasks functions form the single I/O boundary of the program, meaning all disk access is "
            "isolated in two well-defined places rather than scattered throughout the codebase."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: a dataclass plus JSON is a standardised scorecard format. Every match "
            "uses the same columns, batsman, runs, balls faced, and dismissal, written to a file the scorer can "
            "reopen and update without losing prior entries. The fixed structure means anyone can read the "
            "scorecard tomorrow and understand exactly where the innings stood."
        )},
        {"type": "code", "language": "python", "content": (
            "from dataclasses import dataclass, asdict, field\n"
            "from datetime import datetime\n"
            "from uuid import uuid4\n"
            "import json\n"
            "import os\n"
            "\n"
            "\n"
            "@dataclass\n"
            "class Task:\n"
            "    title: str\n"
            "    priority: int = 2                      # 1 = high, 2 = medium, 3 = low\n"
            "    done: bool = False\n"
            "    id: str = field(default_factory=lambda: str(uuid4()))\n"
            "    created_at: str = field(default_factory=lambda: datetime.now().isoformat())\n"
            "\n"
            "\n"
            "def load_tasks(path: str) -> list[Task]:\n"
            "    \"\"\"Read tasks from JSON; return [] if the file is missing or corrupt.\"\"\"\n"
            "    if not os.path.exists(path):\n"
            "        return []\n"
            "    try:\n"
            "        with open(path, \"r\", encoding=\"utf-8\") as fh:\n"
            "            raw = json.load(fh)\n"
            "        return [Task(**item) for item in raw]\n"
            "    except (json.JSONDecodeError, TypeError):\n"
            "        # Corrupt or unexpected data: fail safe with an empty list.\n"
            "        return []\n"
            "\n"
            "\n"
            "def save_tasks(tasks: list[Task], path: str) -> None:\n"
            "    \"\"\"Serialise the task list to JSON on disk.\"\"\"\n"
            "    with open(path, \"w\", encoding=\"utf-8\") as fh:\n"
            "        json.dump([asdict(task) for task in tasks], fh, indent=2)"
        )},
        {"type": "heading", "content": "Step 2 — Core Logic: CRUD Operations", "level": 2},
        {"type": "paragraph", "content": (
            "The CRUD functions are pure: each takes the current task list as input and returns the result of "
            "its operation without touching any global state or performing disk I/O. Purity makes them trivial "
            "to unit test, because the same inputs always produce the same outputs. add_task generates a UUID "
            "for each task, guaranteeing globally unique identifiers without needing a database or a shared "
            "counter, which sidesteps race conditions entirely."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: pure functions are like each delivery being independent. The outcome "
            "of ball 3.4 does not secretly rewrite the bowling figures from over 2; every action has clear "
            "inputs and a clearly recorded outcome on the scorecard. Nothing happens behind the scenes, so the "
            "match record is always reproducible and auditable."
        )},
        {"type": "code", "language": "python", "content": (
            "def add_task(tasks: list[Task], title: str, priority: int = 2) -> list[Task]:\n"
            "    \"\"\"Return a new list with one task appended.\"\"\"\n"
            "    task = Task(title=title, priority=priority)\n"
            "    return tasks + [task]\n"
            "\n"
            "\n"
            "def list_tasks(tasks: list[Task], show_done: bool = False) -> list[Task]:\n"
            "    \"\"\"Return tasks, optionally including completed ones.\"\"\"\n"
            "    if show_done:\n"
            "        return list(tasks)\n"
            "    return [t for t in tasks if not t.done]\n"
            "\n"
            "\n"
            "def complete_task(tasks: list[Task], task_id: str) -> bool:\n"
            "    \"\"\"Mark the matching task done in place; return True if found.\"\"\"\n"
            "    for task in tasks:\n"
            "        if task.id == task_id:\n"
            "            task.done = True\n"
            "            return True\n"
            "    return False\n"
            "\n"
            "\n"
            "def delete_task(tasks: list[Task], task_id: str) -> bool:\n"
            "    \"\"\"Remove the matching task in place; return True if removed.\"\"\"\n"
            "    for index, task in enumerate(tasks):\n"
            "        if task.id == task_id:\n"
            "            del tasks[index]\n"
            "            return True\n"
            "    return False"
        )},
        {"type": "heading", "content": "Step 3 — Integration: CLI Interface", "level": 2},
        {"type": "paragraph", "content": (
            "argparse subparsers map command-line verbs to behaviour: add, list, done, and delete each become a "
            "subcommand with its own arguments. The main() function is the only place that performs I/O. It "
            "loads tasks from disk, dispatches to the appropriate pure function, saves the result back, and "
            "prints feedback to the user. Keeping I/O in one orchestration layer keeps the logic functions pure "
            "and independently testable."
        )},
        {"type": "code", "language": "python", "content": (
            "import argparse\n"
            "\n"
            "DB_PATH = \"tasks.json\"\n"
            "\n"
            "\n"
            "def main() -> None:\n"
            "    parser = argparse.ArgumentParser(description=\"A simple task manager.\")\n"
            "    sub = parser.add_subparsers(dest=\"command\", required=True)\n"
            "\n"
            "    add_p = sub.add_parser(\"add\", help=\"Add a task\")\n"
            "    add_p.add_argument(\"title\")\n"
            "    add_p.add_argument(\"--priority\", type=int, default=2, choices=[1, 2, 3])\n"
            "\n"
            "    list_p = sub.add_parser(\"list\", help=\"List tasks\")\n"
            "    list_p.add_argument(\"--all\", action=\"store_true\", help=\"Include completed\")\n"
            "\n"
            "    done_p = sub.add_parser(\"done\", help=\"Complete a task\")\n"
            "    done_p.add_argument(\"task_id\")\n"
            "\n"
            "    del_p = sub.add_parser(\"delete\", help=\"Delete a task\")\n"
            "    del_p.add_argument(\"task_id\")\n"
            "\n"
            "    args = parser.parse_args()\n"
            "    tasks = load_tasks(DB_PATH)  # I/O boundary: read\n"
            "\n"
            "    if args.command == \"add\":\n"
            "        tasks = add_task(tasks, args.title, args.priority)\n"
            "        print(f\"Added: {args.title}\")\n"
            "    elif args.command == \"list\":\n"
            "        for t in list_tasks(tasks, show_done=args.all):\n"
            "            mark = \"x\" if t.done else \" \"\n"
            "            print(f\"[{mark}] (P{t.priority}) {t.id[:8]}  {t.title}\")\n"
            "    elif args.command == \"done\":\n"
            "        ok = complete_task(tasks, args.task_id)\n"
            "        print(\"Completed.\" if ok else \"Task not found.\")\n"
            "    elif args.command == \"delete\":\n"
            "        ok = delete_task(tasks, args.task_id)\n"
            "        print(\"Deleted.\" if ok else \"Task not found.\")\n"
            "\n"
            "    save_tasks(tasks, DB_PATH)   # I/O boundary: write\n"
            "\n"
            "\n"
            "if __name__ == \"__main__\":\n"
            "    main()"
        )},
        {"type": "heading", "content": "Step 4 — Testing & Verification", "level": 2},
        {"type": "paragraph", "content": (
            "Verify the tool by exercising each subcommand in sequence: add three tasks, list them, complete "
            "one, delete another, then list with --all to confirm the final state reflects every operation."
        )},
        {"type": "code", "language": "bash", "content": (
            "python task_manager.py add \"Write unit tests\" --priority 2\n"
            "python task_manager.py add \"Refactor parser\" --priority 1\n"
            "python task_manager.py add \"Update README\" --priority 3\n"
            "\n"
            "python task_manager.py list\n"
            "# [ ] (P2) 1a2b3c4d  Write unit tests\n"
            "# [ ] (P1) 5e6f7a8b  Refactor parser\n"
            "# [ ] (P3) 9c0d1e2f  Update README\n"
            "\n"
            "python task_manager.py done 1a2b3c4d\n"
            "python task_manager.py delete 9c0d1e2f\n"
            "\n"
            "python task_manager.py list --all\n"
            "# [x] (P2) 1a2b3c4d  Write unit tests\n"
            "# [ ] (P1) 5e6f7a8b  Refactor parser"
        )},
        {"type": "warning_box", "content": (
            "Warning: If tasks.json exists but is empty or was manually edited into invalid JSON, "
            "json.load() raises JSONDecodeError. Always wrap file loading in a try/except and return an empty "
            "list as a fallback. Never crash on a missing or corrupt data file; degrade gracefully instead."
        )},
        {"type": "info_box", "content": (
            "Extension Challenge: Add due dates using Python's datetime module and an 'overdue' flag computed at "
            "list time. Then add a 'python task_manager.py export --format csv' subcommand so tasks can be "
            "imported into spreadsheets for reporting."
        )},
        {"type": "key_points", "items": [
            "Dataclasses auto-generate __init__, __repr__, and __eq__, eliminating repetitive boilerplate.",
            "uuid4() yields globally unique task IDs with no database or shared counter required.",
            "Pure CRUD functions take inputs and return outputs, making them trivial to unit test in isolation.",
            "argparse subparsers map CLI verbs (add/list/done/delete) cleanly to behaviour with per-command arguments.",
            "JSON via the standard library provides zero-dependency, human-readable persistence.",
            "Confining all I/O to main() keeps logic pure and separates side effects from computation."
        ]}
    ]
}

lesson3_dict = {
    "lessonId": "cricket2-3",
    "title": "React 19 & Ecosystem: Quiz",
    "type": "quiz",
    "topicName": "React",
    "estimatedMinutes": 20,
    "xpReward": 50,
    "generated": True,
    "sections": [
        {"type": "heading", "content": "Knowledge Check — React 19 & Ecosystem", "level": 2},
        {"type": "paragraph", "content": (
            "This quiz tests your understanding of React hooks, rendering optimisation, concurrent features, "
            "and state management strategy. Most questions are purely technical, but questions 5 and 6 are "
            "applied scenarios framed as design decisions you would face while building a live cricket scoring "
            "dashboard that pushes ball-by-ball updates to the UI. Read each option carefully before answering."
        )},
        {"type": "quiz",
         "content": "What does useCallback return?",
         "items": [
             "A memoized function reference that only changes when its dependencies change",
             "The cached result of calling the function",
             "A boolean indicating whether dependencies changed",
             "A ref object whose .current holds the function"
         ],
         "answer": 0,
         "explanation": (
             "useCallback returns a memoized function reference that is preserved across renders until a "
             "dependency changes. This matters because passing a freshly created function to a child on every "
             "render breaks React.memo's referential equality check, forcing the child to re-render "
             "needlessly. A stable function identity keeps memoized children stable. useMemo, by contrast, "
             "caches a computed value rather than a function."
         )},
        {"type": "quiz",
         "content": "In React 18, what changed about state update batching compared to React 17?",
         "items": [
             "Batching was removed entirely in favour of synchronous updates",
             "All state updates are now automatically batched, including those in setTimeout, Promises, and native event handlers",
             "Only updates inside React event handlers are batched",
             "Batching now requires wrapping updates in useTransition"
         ],
         "answer": 1,
         "explanation": (
             "React 18 introduced automatic batching everywhere via the new concurrent root. Previously only "
             "updates inside React's synthetic event handlers were batched, so multiple setState calls in a "
             "setTimeout, Promise, or native handler triggered multiple renders. Now React groups all such "
             "updates into a single re-render regardless of origin, improving performance. You can still opt "
             "out with flushSync when a synchronous DOM update is genuinely required."
         )},
        {"type": "quiz",
         "content": "A component wrapped in React.memo receives a prop that is an object created inline: <Component config={{key: 'value'}} />. Does React.memo prevent re-renders?",
         "items": [
             "Yes, React.memo deep-compares objects automatically",
             "Yes, because the object contents are identical",
             "No, a new object reference is created on every parent render, so React.memo's shallow comparison always sees a different prop",
             "No, React.memo only works for class components"
         ],
         "answer": 2,
         "explanation": (
             "React.memo performs a shallow comparison of props by default. An object literal written inline "
             "creates a brand-new reference on every parent render, so even though the contents are identical, "
             "the shallow comparison sees prevProps.config !== nextProps.config and re-renders. To fix it, "
             "memoize the object with useMemo or hoist it to a stable module-level constant so its reference "
             "stays the same across renders."
         )},
        {"type": "quiz",
         "content": "You subscribe to a WebSocket in useEffect with an empty dependency array []. When does the cleanup function run?",
         "items": [
             "When the component unmounts",
             "On every render",
             "Never, because the dependency array is empty",
             "Only when the WebSocket emits an error"
         ],
         "answer": 0,
         "explanation": (
             "With an empty dependency array the effect runs once after mount, and its returned cleanup "
             "function runs once when the component unmounts. This is exactly where you should call "
             "socket.close() to tear down the connection. Skipping cleanup leaks the open socket and its "
             "listeners, which accumulate across mount/unmount cycles and eventually degrade memory and "
             "performance. The cleanup is the mirror image of the setup."
         )},
        {"type": "quiz",
         "content": (
             "You're building a live cricket scoring dashboard. It shows 11 batsman cards with live strike "
             "rates. Every ball delivery triggers a global score update, causing ALL 11 cards to re-render, "
             "even batsmen who haven't faced a ball. What is the most effective fix?"
         ),
         "items": [
             "Wrap each BatsmanCard in React.memo and ensure its props only include that batsman's own data",
             "Lift all state into a single top-level component",
             "Add a key prop to each card",
             "Use useReducer instead of useState"
         ],
         "answer": 0,
         "explanation": (
             "Wrapping each card in React.memo with narrowly scoped props is the effective fix: a card only "
             "re-renders when its own batsman's data actually changes by reference, so updating one batsman "
             "leaves the other ten untouched. Lifting state higher makes the problem worse by re-rendering "
             "more. A key only helps reconciliation of lists, not unnecessary re-renders. useReducer changes "
             "how state updates are dispatched but does not isolate re-renders by itself."
         )},
        {"type": "quiz",
         "content": (
             "Your cricket fantasy app has 500k concurrent users. You need to share: current match state (read "
             "frequently, updates every ball), the user's squad selection (user-specific), and a global "
             "leaderboard (updates every over). Which state management approach fits best?"
         ),
         "items": [
             "React Context for all three pieces of state",
             "useState local to each component",
             "React Query / TanStack Query for server state plus local useState for the squad selection",
             "Redux for everything"
         ],
         "answer": 2,
         "explanation": (
             "Match state and leaderboard are server state: remote data with caching, refetching, and staleness "
             "concerns that React Query handles natively with deduplication and background updates. The squad "
             "selection is local UI state, perfect for useState. Putting frequently changing data in Context "
             "re-renders every consumer on each update, which is catastrophic at this scale. Redux would work "
             "but adds heavy boilerplate and still lacks built-in server-cache semantics, making it overkill here."
         )},
        {"type": "quiz",
         "content": (
             "In your run-chase calculator, a useEffect has deps [target, currentScore]. Inside it you "
             "reference oversRemaining from the component scope, but it's NOT in the deps array. What is the "
             "actual risk?"
         ),
         "items": [
             "A syntax error at compile time",
             "The effect never runs",
             "oversRemaining will always use its value from when the effect was first created (a stale closure)",
             "React automatically adds it to the dependency array"
         ],
         "answer": 2,
         "explanation": (
             "This is a classic stale closure. The effect closes over oversRemaining at the time it was "
             "defined; because that variable is omitted from the deps array, the effect is not re-created when "
             "oversRemaining changes, so it keeps reading the stale captured value. There is no syntax error, "
             "the effect still runs on target/currentScore changes, and React never silently edits your deps. "
             "The lint rule react-hooks/exhaustive-deps exists precisely to catch this bug."
         )},
        {"type": "quiz",
         "content": (
             "You want to display live ball-by-ball commentary fetched from a database in a Next.js App Router "
             "Server Component, but each comment has a 'Like' button that updates state. What is the correct "
             "architecture?"
         ),
         "items": [
             "Put everything, including the data fetch, in one Client Component",
             "Make the whole page a Client Component",
             "Render commentary in a Server Component and pass individual comment items to a small Client Component for the Like button",
             "Use useEffect to fetch the commentary in a Client Component"
         ],
         "answer": 2,
         "explanation": (
             "The correct pattern keeps data fetching on the server and pushes interactivity to small leaf "
             "Client Components. The Server Component fetches commentary directly from the database with zero "
             "client-side JavaScript, then renders a tiny Client Component (the Like button) for each item, "
             "which carries only the interactive logic. Making the whole page a Client Component forfeits "
             "server-side data fetching benefits and ships unnecessary JavaScript; useEffect fetching adds a "
             "client round trip and loading waterfalls."
         )},
        {"type": "key_points", "items": [
            "useCallback memoizes a function's identity, not its result; useMemo memoizes a computed value.",
            "React 18 batches all state updates automatically, including those in timeouts, Promises, and native handlers.",
            "React.memo uses shallow prop comparison, so inline objects and functions defeat it unless memoized.",
            "A useEffect cleanup with empty deps runs on unmount, the right place to close sockets and subscriptions.",
            "Use React Query for server state (caching, refetching) and local useState for UI-only state.",
            "In the App Router, fetch in Server Components and isolate interactivity in small Client Component leaves."
        ]}
    ]
}

lesson4_dict = {
    "lessonId": "cricket2-4",
    "title": "System Design: Deep Dive & Advanced Patterns",
    "type": "reading",
    "topicName": "System Design",
    "estimatedMinutes": 35,
    "xpReward": 75,
    "generated": True,
    "sections": [
        {"type": "heading", "content": "Overview", "level": 2},
        {"type": "paragraph", "content": (
            "System design is the discipline of decomposing large-scale problems into components that can "
            "collectively serve millions of users, sustain high availability, and remain maintainable as the "
            "system and team grow. The core skills are identifying bottlenecks before they topple the system, "
            "choosing data stores whose consistency and access patterns fit the workload, designing explicitly "
            "for partial failure so a single dead node never takes everything down, and reasoning honestly "
            "about trade-offs. Almost every meaningful decision exchanges one desirable property for another, "
            "so the goal is not a perfect architecture but the one best matched to the constraints, traffic "
            "shape, latency budget, and operational maturity of the organisation building it."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: system design trade-offs are the toss decision. The captain reads the "
            "pitch and overhead conditions (the system constraints), then chooses to bat or bowl first (the "
            "architectural commitment), knowing it carries real and irreversible consequences for the match. "
            "There is no universally correct call; there are only sound choices conditioned on the situation in "
            "front of you."
        )},
        {"type": "heading", "content": "Core Concepts", "level": 2},
        {"type": "paragraph", "content": (
            "The CAP theorem states that a distributed data system can simultaneously guarantee at most two of "
            "three properties: Consistency, meaning every read returns the most recent write; Availability, "
            "meaning every request receives a non-error response; and Partition Tolerance, meaning the system "
            "keeps operating despite dropped or delayed messages between nodes. Because real networks do "
            "partition, partition tolerance is non-negotiable, so the genuine choice is between CP and AP. A CP "
            "system stays consistent but may refuse requests during a partition, while an AP system stays "
            "available but may return stale data. ZooKeeper is CP because it prioritises a single consistent "
            "view for coordination; Cassandra is AP because it favours write availability with tunable "
            "eventual consistency; a single-node PostgreSQL instance has no partition to tolerate by "
            "definition, so CAP does not constrain it until you distribute it."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: CAP is the Decision Review System. DRS must trade Consistency, always "
            "reaching the technically correct verdict using ball-tracking and edge detection, against "
            "Availability, delivering a decision quickly so play resumes. When the DRS technology is "
            "unavailable (a partition), the on-field umpire's call simply stands, and the game continues. That "
            "is the AP choice: stay available with a possibly imperfect decision rather than halt play waiting "
            "for perfect consistency."
        )},
        {"type": "code", "language": "text", "content": (
            "                         +-------------------+\n"
            "        clients  ----->  |   Load Balancer   |  (stateless: any node serves any request)\n"
            "                         +---------+---------+\n"
            "                                   |\n"
            "                 +-----------------+-----------------+\n"
            "                 |                 |                 |\n"
            "            +----v----+       +----v----+       +----v----+\n"
            "            | App Srv |       | App Srv |       | App Srv |   (stateless app tier)\n"
            "            +----+----+       +----+----+       +----+----+\n"
            "                 |                 |                 |\n"
            "                 |   writes        |   reads         |   reads\n"
            "                 v                 v                 v\n"
            "          +-------------+   +--------------+   +--------------+\n"
            "          | Primary DB  |   |  Replica #1  |   |  Replica #2  |\n"
            "          |   (CP node) |-->| (AP, async)  |   | (AP, async)  |\n"
            "          +-------------+   +--------------+   +--------------+\n"
            "             all writes        may serve          may serve\n"
            "             go here           stale reads         stale reads"
        )},
        {"type": "paragraph", "content": (
            "In this diagram the read replicas are the AP surface: replication is asynchronous, so immediately "
            "after a write a replica may still serve a slightly stale value until it catches up. The primary "
            "database is the CP node, the single authority through which all writes flow, guaranteeing a "
            "consistent ordering of mutations. The load balancer must be stateless so that any application "
            "server can handle any request; if it pinned sessions to specific nodes, losing one node would "
            "strand its users and complicate horizontal scaling."
        )},
        {"type": "heading", "content": "How It Works Under the Hood", "level": 2},
        {"type": "paragraph", "content": (
            "Consistent hashing distributes keys across N nodes while minimising disruption when N changes. "
            "Both nodes and keys are hashed onto the same circular keyspace, the hash ring, and each key is "
            "owned by the first node encountered moving clockwise from the key's position. When a node is "
            "added or removed, only the keys in the arc adjacent to that node move; the rest stay put. To avoid "
            "hot spots from uneven node placement, each physical node is mapped to many virtual nodes spread "
            "around the ring, smoothing the distribution. A replication factor stores each key on the next R "
            "distinct nodes clockwise for fault tolerance. Naive modulo hashing (node = hash(key) % N) fails "
            "catastrophically when N changes, because nearly every key remaps to a different node, triggering a "
            "cascading reshuffle and a storm of cache misses and data movement."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: consistent hashing is an IPL auction seating plan. Each franchise (a "
            "DB node) is assigned a contiguous range of player slots around the auction table. When a brand-new "
            "franchise joins, only the slots immediately adjacent to its position shift hands; the rest of the "
            "table is undisturbed. Consistent hashing limits the redistribution blast radius in exactly the "
            "same way, so adding capacity does not upheave the whole league."
        )},
        {"type": "code", "language": "python", "content": (
            "import hashlib\n"
            "import bisect\n"
            "\n"
            "\n"
            "class ConsistentHashRing:\n"
            "    def __init__(self, replicas: int = 100):\n"
            "        self.replicas = replicas      # virtual nodes per physical node\n"
            "        self._ring: dict[int, str] = {}\n"
            "        self._sorted_keys: list[int] = []\n"
            "\n"
            "    def _hash(self, value: str) -> int:\n"
            "        digest = hashlib.md5(value.encode()).hexdigest()\n"
            "        return int(digest, 16)\n"
            "\n"
            "    def add_node(self, node: str) -> None:\n"
            "        for i in range(self.replicas):\n"
            "            point = self._hash(f\"{node}:{i}\")\n"
            "            self._ring[point] = node\n"
            "            bisect.insort(self._sorted_keys, point)\n"
            "\n"
            "    def remove_node(self, node: str) -> None:\n"
            "        for i in range(self.replicas):\n"
            "            point = self._hash(f\"{node}:{i}\")\n"
            "            self._ring.pop(point, None)\n"
            "            idx = bisect.bisect_left(self._sorted_keys, point)\n"
            "            if idx < len(self._sorted_keys) and self._sorted_keys[idx] == point:\n"
            "                self._sorted_keys.pop(idx)\n"
            "\n"
            "    def get_node(self, key: str) -> str | None:\n"
            "        if not self._ring:\n"
            "            return None\n"
            "        point = self._hash(key)\n"
            "        # First node clockwise; wrap to the start if past the end.\n"
            "        idx = bisect.bisect(self._sorted_keys, point) % len(self._sorted_keys)\n"
            "        return self._ring[self._sorted_keys[idx]]\n"
            "\n"
            "\n"
            "if __name__ == \"__main__\":\n"
            "    ring = ConsistentHashRing()\n"
            "    for node in (\"node-a\", \"node-b\", \"node-c\"):\n"
            "        ring.add_node(node)\n"
            "    for key in (\"key1\", \"key2\", \"key3\", \"key4\", \"key5\"):\n"
            "        print(key, \"->\", ring.get_node(key))"
        )},
        {"type": "info_box", "content": (
            "Pro Tip: For read-heavy workloads (score queries far outnumber score writes), use read replicas "
            "with async replication and add a Redis cache layer in front. Redis PUBLISH/SUBSCRIBE eliminates "
            "polling: clients subscribe to a channel and receive updates the moment they happen. This can cut "
            "database read load by 95% or more at scale."
        )},
        {"type": "heading", "content": "Common Patterns & Best Practices", "level": 2},
        {"type": "paragraph", "content": (
            "Several patterns recur in large systems. CQRS (Command Query Responsibility Segregation) separates "
            "the write model, which handles commands like CreateOrder and UpdateStatus, from the read model, "
            "which serves queries like GetOrderSummary, letting each side scale and be optimised independently. "
            "Event Sourcing stores every state change as an immutable event, so current state is a projection "
            "derived by replaying those events rather than a mutable row. The Circuit Breaker stops a service "
            "from repeatedly calling a failing dependency, cycling through CLOSED (normal operation), OPEN (fail "
            "fast without calling), and HALF_OPEN (allow a probe to test recovery). The Saga pattern coordinates "
            "distributed transactions across services using compensating actions to undo prior steps when a "
            "later step fails, since a single ACID transaction cannot span multiple services."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: Event Sourcing is the ball-by-ball log behind a scorecard. The "
            "scorecard you see is a projection of every recorded ball event. If a scoring mistake surfaces, the "
            "scorer does not quietly overwrite the scorecard; they append a correction event and re-project the "
            "totals. The ball-by-ball log is the source of truth, exactly as the immutable event store is in "
            "Event Sourcing."
        )},
        {"type": "code", "language": "python", "content": (
            "import time\n"
            "\n"
            "\n"
            "class CircuitOpenError(Exception):\n"
            "    pass\n"
            "\n"
            "\n"
            "class CircuitBreaker:\n"
            "    CLOSED, OPEN, HALF_OPEN = \"CLOSED\", \"OPEN\", \"HALF_OPEN\"\n"
            "\n"
            "    def __init__(self, failure_threshold: int = 5, recovery_timeout: float = 30.0):\n"
            "        self.failure_threshold = failure_threshold\n"
            "        self.recovery_timeout = recovery_timeout\n"
            "        self.failure_count = 0\n"
            "        self.state = self.CLOSED\n"
            "        self._opened_at = 0.0\n"
            "\n"
            "    def call(self, func, *args, **kwargs):\n"
            "        if self.state == self.OPEN:\n"
            "            # After the cooldown, allow a single probe call.\n"
            "            if time.monotonic() - self._opened_at >= self.recovery_timeout:\n"
            "                self.state = self.HALF_OPEN\n"
            "            else:\n"
            "                raise CircuitOpenError(\"Circuit is open; failing fast.\")\n"
            "        try:\n"
            "            result = func(*args, **kwargs)\n"
            "        except Exception:\n"
            "            self._on_failure()\n"
            "            raise\n"
            "        self._on_success()\n"
            "        return result\n"
            "\n"
            "    def _on_success(self) -> None:\n"
            "        self.failure_count = 0\n"
            "        self.state = self.CLOSED\n"
            "\n"
            "    def _on_failure(self) -> None:\n"
            "        self.failure_count += 1\n"
            "        if self.failure_count >= self.failure_threshold or self.state == self.HALF_OPEN:\n"
            "            self.state = self.OPEN\n"
            "            self._opened_at = time.monotonic()"
        )},
        {"type": "warning_box", "content": (
            "Warning: Do not start with microservices. A distributed monolith, where services are split apart "
            "but remain tightly coupled through synchronous calls, is harder to operate than a well-structured "
            "monolith. Extract services only when you have clear bounded contexts, independent scaling needs, "
            "and separate deployment requirements. Most systems should begin as a modular monolith."
        )},
        {"type": "heading", "content": "Real-World Application", "level": 2},
        {"type": "paragraph", "content": (
            "Major platforms apply these patterns at extreme scale. Disney+ Hotstar served a reported 25.3 "
            "million concurrent viewers during IPL 2023 using adaptive bitrate streaming combined with Redis "
            "pub/sub to push live scores without client polling. Twitter's home timeline uses fanout-on-write (a "
            "CQRS-style materialised write model) for ordinary users with under a million followers, but "
            "switches to fanout-on-read for celebrity accounts to avoid writing a single tweet into hundreds of "
            "millions of timelines. Amazon DynamoDB uses consistent hashing internally to distribute items "
            "across partitions by partition key, which is why hot keys can create throughput hotspots."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: Twitter's fanout strategy mirrors cricket broadcasting. For a small "
            "club match the scorer updates each player's app individually (fanout-on-write). But for a Virat "
            "Kohli century, the broadcaster pushes a single feed to 50 million viewers at once through a CDN "
            "cache layer (fanout-on-read). Different audience sizes demand different strategies, exactly like "
            "Twitter's hybrid timeline design."
        )},
        {"type": "key_points", "items": [
            "Since networks always partition, CAP forces a real choice between CP (consistent, may reject) and AP (available, may be stale).",
            "Consistent hashing moves only keys adjacent to a changed node, avoiding the full reshuffle of modulo hashing.",
            "CQRS separates write and read models so each can be optimised and scaled independently.",
            "Event Sourcing stores immutable events and derives state by projection, making history auditable and correctable.",
            "Circuit Breakers fail fast during downstream outages, preventing cascading failures and thundering-herd retries.",
            "Begin with a modular monolith; extract microservices only when bounded contexts and scaling needs are clear."
        ]},
        {"type": "quiz",
         "content": (
             "Your payment system for a cricket fantasy app requires that every user's wallet balance is always "
             "accurate, with no stale reads allowed. A network partition occurs between your app servers and "
             "the DB. Which CAP choice does this requirement force?"
         ),
         "items": [
             "AP — stay available with potentially stale balances",
             "CP — reject requests rather than return stale data",
             "CA — guarantee both consistency and availability if you design carefully",
             "PA — partition tolerance is optional for payments"
         ],
         "answer": 1,
         "explanation": (
             "Financial correctness demands CP: when a partition prevents confirming the latest authoritative "
             "balance, the system must reject or block the request rather than risk a stale read that could "
             "permit overspending or double-spending. AP is wrong because stale balances are unacceptable for "
             "money. CA does not exist in a genuinely distributed system, since partitions are inevitable and "
             "must be tolerated. PA is nonsensical because partition tolerance is mandatory, not optional, "
             "across a network."
         )},
        {"type": "quiz",
         "content": (
             "Your cricket live score API handles 2M req/s during peak. Scores update every 30 seconds. Which "
             "caching strategy gives the lowest read latency while ensuring scores are never more than 30 "
             "seconds stale?"
         ),
         "items": [
             "No cache; always query the database",
             "Cache-aside with a 30-second TTL in Redis",
             "Write-through cache that updates Redis synchronously on every score write, with a 30-second TTL as a safety net",
             "CDN-only caching with a 5-minute TTL"
         ],
         "answer": 2,
         "explanation": (
             "A write-through cache updates Redis synchronously the instant a score is written, so reads hit a "
             "fresh value immediately at memory speed, and a 30-second TTL bounds staleness as a safety net. "
             "Querying the database for every request cannot survive 2M req/s. Cache-aside leaves a stale "
             "window until the next miss repopulates the entry. A CDN with a 5-minute TTL violates the "
             "30-second freshness requirement outright, serving scores up to five minutes old."
         )}
    ]
}

lesson5_dict = {
    "lessonId": "cricket2-5",
    "title": "AWS Solutions Architect: Capstone Mini Project",
    "type": "project",
    "topicName": "AWS",
    "estimatedMinutes": 60,
    "xpReward": 150,
    "generated": True,
    "sections": [
        {"type": "heading", "content": "Project Overview", "level": 2},
        {"type": "paragraph", "content": (
            "You will build a serverless, event-driven notification system on AWS. Users subscribe to topics, "
            "for example a particular cricket team, and when an event is published (a match result or a wicket "
            "alert) every subscriber receives a notification by email. The architecture uses Amazon SNS for "
            "fan-out, Amazon SQS as a reliable delivery buffer, AWS Lambda for stateless processing, Amazon "
            "DynamoDB for subscription management, Amazon SES for email delivery, and Amazon API Gateway to "
            "expose a REST API. The project is a practical demonstration of the publisher-subscriber pattern "
            "implemented at AWS scale, with reliability, retries, and least-privilege security designed in from "
            "the start rather than bolted on afterwards."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: this is the broadcasting-rights chain. ESPN, Star Sports, and DD "
            "Sports all subscribe to the BCCI match feed (the SNS topic). When India wins, the result signal "
            "(the event) reaches the BCCI feed via the publisher (a Lambda), which fans out to every broadcaster "
            "simultaneously through SNS into SQS into consumer Lambdas. One publish, many synchronised "
            "deliveries, exactly how SNS fan-out works."
        )},
        {"type": "heading", "content": "Learning Objectives", "level": 2},
        {"type": "key_points", "items": [
            "Model SNS topics and subscriptions for one-to-many fan-out messaging.",
            "Use SQS queues as durable buffers that absorb spikes and enable safe retries.",
            "Write event-driven AWS Lambda functions triggered by API Gateway and SQS.",
            "Design DynamoDB tables for subscription state with efficient access patterns.",
            "Build a REST API with API Gateway, including API-key protection.",
            "Author least-privilege IAM roles scoped per Lambda function."
        ]},
        {"type": "heading", "content": "Technical Requirements", "level": 2},
        {"type": "key_points", "items": [
            "POST /subscriptions creates a subscription from an email address and a topic.",
            "DELETE /subscriptions/{id} removes a subscription by its identifier.",
            "POST /events publishes an event (title and message) to a topic.",
            "GET /subscriptions lists subscriptions filtered by topic.",
            "An SQS dead-letter queue captures notifications that fail processing.",
            "DynamoDB TTL expires subscriptions automatically one year after creation.",
            "Lambda reserved concurrency is capped at 10 to control cost and downstream load.",
            "All API endpoints are protected by an API key."
        ]},
        {"type": "heading", "content": "Architecture & Design", "level": 2},
        {"type": "paragraph", "content": (
            "The request flow begins at API Gateway, which receives REST calls and routes them to three Lambda "
            "functions: SubscribeHandler, UnsubscribeHandler, and PublishEventHandler. DynamoDB stores "
            "subscriptions using a composite key, PK=TOPIC#{topic} and SK=SUB#{subscriptionId}, so every "
            "subscription for a topic is co-located for efficient querying. On publish, PublishEventHandler "
            "writes the event to an SNS topic, SNS fans the message out to an SQS queue, and a separate "
            "NotificationProcessor Lambda polls SQS, formats the message, and sends an SES email to each "
            "subscriber. A dead-letter queue captures any message that fails after three processing attempts, "
            "and CloudWatch records every Lambda invocation. Each Lambda is assigned its own IAM role granting "
            "only the permissions it actually needs. SQS sits deliberately between SNS and the processor "
            "because it buffers traffic spikes, enables automatic retries, and prevents the consumer Lambda from "
            "being overwhelmed by a sudden burst of events."
        )},
        {"type": "analogy", "content": (
            "🏏 Think of it like cricket: the SNS to SQS to Lambda chain is a live broadcast pipeline. SNS is "
            "the BCCI satellite match feed, SQS is the broadcast van's buffer that briefly stores the signal if "
            "the stadium uplink stutters, and Lambda is the transmission tower that converts the buffered signal "
            "into the final broadcast. Because of the SQS buffer, no delivery is lost even if the processing "
            "tower is momentarily overwhelmed by a flood of incoming signal."
        )},
        {"type": "code", "language": "yaml", "content": (
            "AWSTemplateFormatVersion: '2010-09-09'\n"
            "Transform: AWS::Serverless-2016-10-31\n"
            "Description: Serverless match-result notification API\n"
            "\n"
            "Globals:\n"
            "  Function:\n"
            "    Runtime: python3.12\n"
            "    Timeout: 15\n"
            "    MemorySize: 256\n"
            "    Tracing: Active\n"
            "\n"
            "Resources:\n"
            "  SubscriptionsTable:\n"
            "    Type: AWS::DynamoDB::Table\n"
            "    Properties:\n"
            "      BillingMode: PAY_PER_REQUEST\n"
            "      AttributeDefinitions:\n"
            "        - AttributeName: PK\n"
            "          AttributeType: S\n"
            "        - AttributeName: SK\n"
            "          AttributeType: S\n"
            "      KeySchema:\n"
            "        - AttributeName: PK\n"
            "          KeyType: HASH\n"
            "        - AttributeName: SK\n"
            "          KeyType: RANGE\n"
            "      TimeToLiveSpecification:\n"
            "        AttributeName: ttl\n"
            "        Enabled: true\n"
            "\n"
            "  EventsTopic:\n"
            "    Type: AWS::SNS::Topic\n"
            "\n"
            "  NotificationDLQ:\n"
            "    Type: AWS::SQS::Queue\n"
            "\n"
            "  NotificationQueue:\n"
            "    Type: AWS::SQS::Queue\n"
            "    Properties:\n"
            "      RedrivePolicy:\n"
            "        deadLetterTargetArn: !GetAtt NotificationDLQ.Arn\n"
            "        maxReceiveCount: 3\n"
            "\n"
            "  QueueSubscription:\n"
            "    Type: AWS::SNS::Subscription\n"
            "    Properties:\n"
            "      TopicArn: !Ref EventsTopic\n"
            "      Protocol: sqs\n"
            "      Endpoint: !GetAtt NotificationQueue.Arn\n"
            "\n"
            "  Api:\n"
            "    Type: AWS::Serverless::Api\n"
            "    Properties:\n"
            "      StageName: prod\n"
            "      Auth:\n"
            "        ApiKeyRequired: true\n"
            "\n"
            "  SubscribeHandler:\n"
            "    Type: AWS::Serverless::Function\n"
            "    Properties:\n"
            "      Handler: app.subscribe_handler\n"
            "      Policies:\n"
            "        - DynamoDBCrudPolicy:\n"
            "            TableName: !Ref SubscriptionsTable\n"
            "      Environment:\n"
            "        Variables:\n"
            "          TABLE_NAME: !Ref SubscriptionsTable\n"
            "      Events:\n"
            "        Subscribe:\n"
            "          Type: Api\n"
            "          Properties:\n"
            "            RestApiId: !Ref Api\n"
            "            Path: /subscriptions\n"
            "            Method: post\n"
            "\n"
            "  PublishEventHandler:\n"
            "    Type: AWS::Serverless::Function\n"
            "    Properties:\n"
            "      Handler: app.publish_event_handler\n"
            "      Policies:\n"
            "        - DynamoDBReadPolicy:\n"
            "            TableName: !Ref SubscriptionsTable\n"
            "        - SNSPublishMessagePolicy:\n"
            "            TopicName: !GetAtt EventsTopic.TopicName\n"
            "      Environment:\n"
            "        Variables:\n"
            "          TABLE_NAME: !Ref SubscriptionsTable\n"
            "          TOPIC_ARN: !Ref EventsTopic\n"
            "      Events:\n"
            "        Publish:\n"
            "          Type: Api\n"
            "          Properties:\n"
            "            RestApiId: !Ref Api\n"
            "            Path: /events\n"
            "            Method: post\n"
            "\n"
            "  NotificationProcessor:\n"
            "    Type: AWS::Serverless::Function\n"
            "    Properties:\n"
            "      Handler: app.notification_processor\n"
            "      ReservedConcurrentExecutions: 10\n"
            "      Policies:\n"
            "        - DynamoDBReadPolicy:\n"
            "            TableName: !Ref SubscriptionsTable\n"
            "        - SESCrudPolicy:\n"
            "            IdentityName: notifications.example.com\n"
            "      Environment:\n"
            "        Variables:\n"
            "          TABLE_NAME: !Ref SubscriptionsTable\n"
            "      Events:\n"
            "        FromQueue:\n"
            "          Type: SQS\n"
            "          Properties:\n"
            "            Queue: !GetAtt NotificationQueue.Arn\n"
            "            BatchSize: 10"
        )},
        {"type": "heading", "content": "Phase 1 — Core Implementation", "level": 2},
        {"type": "paragraph", "content": (
            "Phase 1 creates and removes subscriptions, storing each in DynamoDB. The key design decision is the "
            "composite primary key, with the partition key set to the topic and the sort key to the "
            "subscription ID. Because all subscriptions for a topic share the same partition key, every "
            "subscriber for a topic can be retrieved with a single Query operation rather than an expensive "
            "full-table Scan, which keeps reads fast and cost-effective as the table grows."
        )},
        {"type": "code", "language": "python", "content": (
            "import json\n"
            "import os\n"
            "import re\n"
            "import time\n"
            "from uuid import uuid4\n"
            "\n"
            "import boto3\n"
            "\n"
            "TABLE_NAME = os.environ[\"TABLE_NAME\"]\n"
            "ddb = boto3.resource(\"dynamodb\").Table(TABLE_NAME)\n"
            "\n"
            "EMAIL_RE = re.compile(r\"^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$\")\n"
            "ONE_YEAR_SECONDS = 365 * 24 * 60 * 60\n"
            "\n"
            "\n"
            "def _response(status: int, body: dict) -> dict:\n"
            "    return {\"statusCode\": status, \"body\": json.dumps(body)}\n"
            "\n"
            "\n"
            "def subscribe_handler(event, context):\n"
            "    try:\n"
            "        payload = json.loads(event.get(\"body\") or \"{}\")\n"
            "    except json.JSONDecodeError:\n"
            "        return _response(400, {\"error\": \"invalid JSON body\"})\n"
            "\n"
            "    email = payload.get(\"email\", \"\")\n"
            "    topic = payload.get(\"topic\", \"\")\n"
            "    if not EMAIL_RE.match(email):\n"
            "        return _response(400, {\"error\": \"invalid email\"})\n"
            "    if not topic:\n"
            "        return _response(400, {\"error\": \"topic is required\"})\n"
            "\n"
            "    subscription_id = str(uuid4())\n"
            "    now = int(time.time())\n"
            "    ddb.put_item(Item={\n"
            "        \"PK\": f\"TOPIC#{topic}\",\n"
            "        \"SK\": f\"SUB#{subscription_id}\",\n"
            "        \"email\": email,\n"
            "        \"created_at\": now,\n"
            "        \"ttl\": now + ONE_YEAR_SECONDS,\n"
            "    })\n"
            "    return _response(201, {\"subscriptionId\": subscription_id})\n"
            "\n"
            "\n"
            "def unsubscribe_handler(event, context):\n"
            "    params = event.get(\"pathParameters\") or {}\n"
            "    subscription_id = params.get(\"id\")\n"
            "    topic = (event.get(\"queryStringParameters\") or {}).get(\"topic\")\n"
            "    if not subscription_id or not topic:\n"
            "        return _response(400, {\"error\": \"id and topic are required\"})\n"
            "    ddb.delete_item(Key={\n"
            "        \"PK\": f\"TOPIC#{topic}\",\n"
            "        \"SK\": f\"SUB#{subscription_id}\",\n"
            "    })\n"
            "    return _response(204, {})"
        )},
        {"type": "heading", "content": "Phase 2 — Feature Completion", "level": 2},
        {"type": "paragraph", "content": (
            "Phase 2 publishes events and delivers notifications. The publish_event_handler validates that the "
            "target topic actually has subscribers, publishes a structured message to SNS (which fans out to "
            "SQS), and returns an event ID. The notification_processor is triggered by SQS, fetches the "
            "subscriber emails for the topic from DynamoDB, and sends each email through SES, reporting any "
            "items that failed so the batch can be retried correctly."
        )},
        {"type": "code", "language": "python", "content": (
            "import json\n"
            "import os\n"
            "from uuid import uuid4\n"
            "\n"
            "import boto3\n"
            "from boto3.dynamodb.conditions import Key\n"
            "\n"
            "TABLE_NAME = os.environ[\"TABLE_NAME\"]\n"
            "TOPIC_ARN = os.environ.get(\"TOPIC_ARN\")\n"
            "SENDER = \"alerts@notifications.example.com\"\n"
            "\n"
            "ddb = boto3.resource(\"dynamodb\").Table(TABLE_NAME)\n"
            "sns = boto3.client(\"sns\")\n"
            "ses = boto3.client(\"ses\")\n"
            "\n"
            "\n"
            "def _subscribers(topic: str):\n"
            "    resp = ddb.query(KeyConditionExpression=Key(\"PK\").eq(f\"TOPIC#{topic}\"))\n"
            "    return resp.get(\"Items\", [])\n"
            "\n"
            "\n"
            "def publish_event_handler(event, context):\n"
            "    payload = json.loads(event.get(\"body\") or \"{}\")\n"
            "    topic = payload.get(\"topic\", \"\")\n"
            "    title = payload.get(\"title\", \"\")\n"
            "    message = payload.get(\"message\", \"\")\n"
            "\n"
            "    if not _subscribers(topic):\n"
            "        return {\"statusCode\": 404, \"body\": json.dumps({\"error\": \"no subscribers\"})}\n"
            "\n"
            "    event_id = str(uuid4())\n"
            "    sns.publish(\n"
            "        TopicArn=TOPIC_ARN,\n"
            "        Message=json.dumps({\"eventId\": event_id, \"topic\": topic,\n"
            "                            \"title\": title, \"message\": message}),\n"
            "    )\n"
            "    return {\"statusCode\": 202, \"body\": json.dumps({\"eventId\": event_id})}\n"
            "\n"
            "\n"
            "def notification_processor(event, context):\n"
            "    failures = []\n"
            "    for record in event.get(\"Records\", []):\n"
            "        try:\n"
            "            sns_envelope = json.loads(record[\"body\"])\n"
            "            data = json.loads(sns_envelope[\"Message\"])\n"
            "            for sub in _subscribers(data[\"topic\"]):\n"
            "                ses.send_email(\n"
            "                    Source=SENDER,\n"
            "                    Destination={\"ToAddresses\": [sub[\"email\"]]},\n"
            "                    Message={\n"
            "                        \"Subject\": {\"Data\": data[\"title\"]},\n"
            "                        \"Body\": {\"Text\": {\"Data\": data[\"message\"]}},\n"
            "                    },\n"
            "                )\n"
            "        except Exception:\n"
            "            # Report this record so SQS retries only the failed item.\n"
            "            failures.append({\"itemIdentifier\": record[\"messageId\"]})\n"
            "    return {\"batchItemFailures\": failures}"
        )},
        {"type": "heading", "content": "Phase 3 — Polish & Production Readiness", "level": 2},
        {"type": "paragraph", "content": (
            "Phase 3 hardens the system for production. Input validation enforces a correct email format, an "
            "alphanumeric-and-hyphen topic name, and message length limits. Structured logging emits JSON "
            "records containing the request ID, topic, and subscriber count so CloudWatch Logs Insights can "
            "query them efficiently. A CloudWatch alarm fires when the dead-letter queue depth exceeds zero, "
            "X-Ray tracing is enabled on every Lambda for end-to-end latency profiling, and API Gateway "
            "throttling caps each API key at 100 requests per second to protect downstream resources."
        )},
        {"type": "code", "language": "python", "content": (
            "import json\n"
            "import logging\n"
            "\n"
            "from aws_xray_sdk.core import xray_recorder\n"
            "from pydantic import BaseModel, EmailStr, Field, ValidationError\n"
            "\n"
            "logger = logging.getLogger()\n"
            "logger.setLevel(logging.INFO)\n"
            "\n"
            "\n"
            "class SubscribeRequest(BaseModel):\n"
            "    email: EmailStr\n"
            "    topic: str = Field(pattern=r\"^[a-z0-9-]+$\", max_length=50)\n"
            "\n"
            "\n"
            "def validate_and_parse(body: str) -> SubscribeRequest:\n"
            "    \"\"\"Parse and validate the request body, raising on bad input.\"\"\"\n"
            "    return SubscribeRequest.model_validate_json(body)\n"
            "\n"
            "\n"
            "def log_event(request_id: str, topic: str, subscriber_count: int) -> None:\n"
            "    \"\"\"Emit a single structured JSON log line for CloudWatch Insights.\"\"\"\n"
            "    logger.info(json.dumps({\n"
            "        \"request_id\": request_id,\n"
            "        \"topic\": topic,\n"
            "        \"subscriber_count\": subscriber_count,\n"
            "    }))\n"
            "\n"
            "\n"
            "@xray_recorder.capture(\"dynamodb_put_subscription\")\n"
            "def put_subscription(table, item: dict) -> None:\n"
            "    table.put_item(Item=item)\n"
            "\n"
            "\n"
            "def handler(event, context):\n"
            "    try:\n"
            "        req = validate_and_parse(event.get(\"body\") or \"{}\")\n"
            "    except ValidationError as exc:\n"
            "        return {\"statusCode\": 422, \"body\": exc.json()}\n"
            "    log_event(context.aws_request_id, req.topic, 0)\n"
            "    return {\"statusCode\": 201, \"body\": json.dumps({\"topic\": req.topic})}"
        )},
        {"type": "heading", "content": "Evaluation Rubric", "level": 2},
        {"type": "key_points", "items": [
            "DynamoDB composite key (PK=topic, SK=subscription) enables single-Query retrieval of all subscribers per topic.",
            "Each Lambda has its own IAM role granting only the permissions it needs (least privilege).",
            "An SQS dead-letter queue captures every notification that fails after the configured retries.",
            "Input validation rejects malformed emails and invalid topic names before any write occurs.",
            "A CloudWatch alarm on DLQ depth > 0 alerts operators to delivery failures promptly.",
            "A cost estimate is provided showing Lambda, DynamoDB, SNS, and SES stay within the free tier for under 10k events/day.",
            "X-Ray traces show end-to-end latency from API Gateway through Lambda, SNS, SQS, and SES."
        ]},
        {"type": "info_box", "content": (
            "Extension Challenges: 1) Add a WebSocket API Gateway so subscribers receive real-time browser push "
            "notifications without polling. 2) Add a Lambda@Edge function on CloudFront to rate-limit subscribe "
            "requests by IP and prevent subscription spam. 3) Implement topic-level access control with Cognito "
            "user pools so only authenticated users can publish events to premium topics."
        )}
    ]
}

lessons = [lesson1_dict, lesson2_dict, lesson3_dict, lesson4_dict, lesson5_dict]

if __name__ == "__main__":
    import json
    print(json.dumps(lessons, indent=2)[:500])
