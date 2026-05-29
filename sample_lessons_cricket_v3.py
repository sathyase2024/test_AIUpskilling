# sample_lessons_cricket_v3.py — v3 with deep 3-part analogies

def _s(type_, content, **kw):
    return {"type": type_, "content": content, "language": kw.get("language",""),
            "level": kw.get("level",2), "items": kw.get("items",[]),
            "answer": kw.get("answer",-1), "explanation": kw.get("explanation","")}


lesson1_java = {
    "lessonId": "cricket-v3-1",
    "title": "Java Mastery: Introduction & Core Concepts",
    "type": "reading",
    "topicName": "Java Programming",
    "estimatedMinutes": 30,
    "xpReward": 75,
    "generated": True,
    "sections": [
        _s("heading", "Overview", level=2),

        _s("paragraph",
           "Java solves the problem of platform independence through an elegant layer of indirection: "
           "source code is compiled not to native machine code but to an intermediate format called bytecode, "
           "stored in .class files. This bytecode is then executed by the Java Virtual Machine (JVM), an "
           "abstraction layer that sits between your program and the underlying operating system. This is the "
           "essence of Java's famous promise — \"write once, run anywhere\" — because the same .class file runs "
           "unchanged on Windows, macOS, or Linux, as long as a compatible JVM is installed. This portability, "
           "combined with strong static typing, automatic memory management, and a vast standard library, is "
           "why Java dominates enterprise software: Spring Boot powers backend microservices, Android builds on "
           "the JVM, and the world's largest banking and trading systems run on it because the JVM's predictable "
           "behaviour and decades of hardening make it dependable at massive scale."),

        _s("analogy",
           "🏏 Think of it like cricket: Think about the Laws of Cricket published by the MCC (Marylebone "
           "Cricket Club). These laws govern every match worldwide — whether it's a Test at Lord's, a T20 in "
           "the IPL, or a village match in Chennai. A cricket ball bowled by Bumrah in Mumbai follows the same "
           "rules as one bowled by Anderson at The Oval. "
           "Java bytecode is the Laws of Cricket — written once, applicable everywhere. The JVM (Java Virtual "
           "Machine) is the umpire who enforces those laws on whatever physical ground (operating system) the "
           "match is played. Just as the same LBW law produces different outcomes based on pitch conditions "
           "(Windows vs macOS behaviour at the hardware level), the JVM adapts bytecode execution to the local "
           "hardware while keeping the rules identical. Your .java source code is the team's game plan — "
           "compiled by javac into the universal .class bytecode format, which any JVM-certified umpire can "
           "interpret. "
           "This is why Java achieved cross-platform portability long before it was common — the indirection "
           "layer (the JVM/umpire) absorbs all platform differences so that the program (the game plan) never "
           "has to change."),

        _s("heading", "Core Concepts — OOP and the Type System", level=2),

        _s("paragraph",
           "Object-oriented programming in Java is built around classes, which are blueprints describing the "
           "state (fields) and behaviour (methods) of the objects created from them. Four pillars define the "
           "paradigm. Encapsulation hides internal data behind methods, so callers interact through a public "
           "interface rather than touching private fields directly. Inheritance lets a subclass extend a parent "
           "class, reusing and specialising its behaviour through an IS-A relationship. Polymorphism allows the "
           "same method call to produce different behaviour depending on the actual runtime type of the object, "
           "not the declared reference type. Abstraction expresses contracts through interfaces and abstract "
           "classes that define what must be done without dictating how. Java enforces a strict rule: a class "
           "may extend exactly one superclass but implement any number of interfaces, avoiding the diamond "
           "problem of multiple implementation inheritance. The compiler enforces the type system entirely at "
           "compile time, rejecting type-incompatible assignments before the program ever runs. Method "
           "overriding lets a subclass replace inherited behaviour, and the @Override annotation tells the "
           "compiler to verify that the method genuinely overrides a superclass method, catching signature "
           "typos at compile time rather than as silent bugs."),

        _s("analogy",
           "🏏 Think of it like cricket: In cricket, every player is a CricketPlayer at a fundamental level — "
           "they wear the same whites, follow the same Laws, and take the field together. But when play begins, "
           "a Batsman and a Bowler behave completely differently. Rohit Sharma, facing a delivery, executes his "
           "pull-shot technique, while Jasprit Bumrah, at the crease, executes his unique wrist-seam bowling "
           "action — and an all-rounder like Ben Stokes can do both. "
           "The abstract class CricketPlayer represents the contract every player shares — name, team, and a "
           "play() method. Inheritance means Batsman and Bowler are specialisations: each IS-A CricketPlayer "
           "but adds its own behaviour like a batting average or a bowling economy. Encapsulation means Rohit's "
           "shot-selection logic is private and hidden — you only observe the public result through "
           "getRunsScored(). Polymorphism is what happens when you call player.play() across a "
           "List<CricketPlayer>: the JVM doesn't need to know each player's specialisation at compile time, "
           "because at runtime it dispatches to Batsman.play() or Bowler.play() based on the actual object "
           "type. The interface Captain is a separate contract, so Rohit can be both a Batsman (extends) and a "
           "Captain (implements) — exactly as Java allows one superclass but multiple interfaces. "
           "Polymorphism is the reason you can write one function that processes a whole batting lineup without "
           "knowing each player's role: the type system guarantees play() always exists, and each player knows "
           "its own implementation."),

        _s("code",
           "import java.util.*;\n\n"
           "abstract class CricketPlayer {\n"
           "    protected String name;\n"
           "    protected String teamName;\n\n"
           "    public CricketPlayer(String name, String teamName) {\n"
           "        this.name = name;\n"
           "        this.teamName = teamName;\n"
           "    }\n\n"
           "    public abstract String getRole();\n"
           "    public abstract void play();\n\n"
           "    public String introduce() {\n"
           "        return name + \" (\" + teamName + \") — \" + getRole();\n"
           "    }\n"
           "}\n\n"
           "class Batsman extends CricketPlayer {\n"
           "    private double battingAverage;\n"
           "    private int totalRuns;\n\n"
           "    public Batsman(String name, String teamName, double battingAverage, int totalRuns) {\n"
           "        super(name, teamName);\n"
           "        this.battingAverage = battingAverage;\n"
           "        this.totalRuns = totalRuns;\n"
           "    }\n\n"
           "    @Override\n"
           "    public String getRole() { return \"Batsman\"; }\n\n"
           "    @Override\n"
           "    public void play() {\n"
           "        System.out.println(name + \" takes guard and plays a crisp cover drive \"\n"
           "            + \"(avg \" + battingAverage + \", \" + totalRuns + \" runs).\");\n"
           "    }\n\n"
           "    public int getRunsScored() { return totalRuns; }\n"
           "}\n\n"
           "class Bowler extends CricketPlayer {\n"
           "    private int wickets;\n"
           "    private double economyRate;\n\n"
           "    public Bowler(String name, String teamName, int wickets, double economyRate) {\n"
           "        super(name, teamName);\n"
           "        this.wickets = wickets;\n"
           "        this.economyRate = economyRate;\n"
           "    }\n\n"
           "    @Override\n"
           "    public String getRole() { return \"Bowler\"; }\n\n"
           "    @Override\n"
           "    public void play() {\n"
           "        System.out.println(name + \" steams in and bowls a yorker at the toes \"\n"
           "            + \"(\" + wickets + \" wkts, econ \" + economyRate + \").\");\n"
           "    }\n"
           "}\n\n"
           "interface Captain {\n"
           "    void declareCaptain();\n"
           "    void setFieldingPositions();\n"
           "}\n\n"
           "class AllRounder extends Batsman implements Captain {\n"
           "    private double bowlingEconomy;\n\n"
           "    public AllRounder(String name, String teamName, double battingAverage,\n"
           "                      int totalRuns, double bowlingEconomy) {\n"
           "        super(name, teamName, battingAverage, totalRuns);\n"
           "        this.bowlingEconomy = bowlingEconomy;\n"
           "    }\n\n"
           "    @Override\n"
           "    public String getRole() { return \"All-Rounder\"; }\n\n"
           "    @Override\n"
           "    public void declareCaptain() {\n"
           "        System.out.println(name + \" leads the side from the front.\");\n"
           "    }\n\n"
           "    @Override\n"
           "    public void setFieldingPositions() {\n"
           "        System.out.println(name + \" sets a slip cordon and a deep point.\");\n"
           "    }\n"
           "}\n\n"
           "public class PlayingXI {\n"
           "    public static void main(String[] args) {\n"
           "        List<CricketPlayer> playing11 = Arrays.asList(\n"
           "            new Batsman(\"Rohit Sharma\", \"India\", 48.5, 9847),\n"
           "            new Bowler(\"Jasprit Bumrah\", \"India\", 297, 2.74),\n"
           "            new AllRounder(\"Ravindra Jadeja\", \"India\", 35.2, 280, 4.1)\n"
           "        );\n\n"
           "        playing11.forEach(p -> {\n"
           "            System.out.println(p.introduce());\n"
           "            p.play();\n"
           "        });\n"
           "    }\n"
           "}",
           language="java"),

        _s("paragraph",
           "Walking through the code: declaring CricketPlayer abstract prevents anyone from instantiating a "
           "generic player with `new CricketPlayer(...)`, because a player with no concrete role makes no sense "
           "— you must create a Batsman, Bowler, or AllRounder. When `p.play()` is called on each element, the "
           "JVM consults the virtual method table (vtable) of the actual object to dispatch to the correct "
           "subclass implementation at runtime, not the declared CricketPlayer type. The @Override annotation "
           "is verified at compile time, so a typo like `paly()` fails the build immediately instead of "
           "silently creating an unrelated method. Finally, List<CricketPlayer> can legally hold Batsman and "
           "Bowler objects because of the Liskov substitution principle: any subtype can stand in wherever its "
           "supertype is expected, which is precisely what makes the polymorphic loop type-safe."),

        _s("heading", "How It Works Under the Hood", level=2),

        _s("paragraph",
           "Internally, javac compiles each .java file to .class bytecode, which the JVM loads lazily through "
           "the ClassLoader — classes are loaded only when first referenced, not all at startup. The JVM begins "
           "by interpreting bytecode instruction by instruction, which is portable but relatively slow. The "
           "Just-In-Time (JIT) compiler then profiles execution: HotSpot uses a tiered approach, first applying "
           "the C1 \"client\" compiler for quick baseline optimisation, then promoting genuinely hot methods "
           "(typically after roughly 10,000 invocations) to the C2 \"server\" compiler, which performs "
           "aggressive optimisations like inlining and dead-code elimination and emits native machine code. "
           "Memory is split between the heap, which stores objects (a young generation for short-lived objects "
           "and an old generation for long-lived ones), and per-thread stacks, which store method frames "
           "holding local variables and the operand stack. The garbage collector — G1GC by default in Java 17+ "
           "— uses concurrent marking to identify unreachable objects with minimal stop-the-world pauses. Each "
           "class carries a vtable that enables O(1) polymorphic dispatch by indexing directly into the table "
           "rather than searching for the right method."),

        _s("analogy",
           "🏏 Think of it like cricket: Consider how a team analyst works during the IPL. Before the season, "
           "the analyst watches footage of every opposition batsman who might take the field. During the match, "
           "the team doesn't unleash its most specialised plan on the very first delivery — a spinner bowls "
           "standard off-spin to start. But once Virat Kohli has faced fifteen balls and a clear pattern has "
           "emerged, the analyst identifies his weakness against the short ball and the bowler commits to a "
           "targeted bouncer plan. "
           "The ClassLoader is the analyst who only pulls footage of players who actually take the field, not "
           "every cricketer in the national database — that is lazy class loading. The JIT's two-tier "
           "compilation mirrors how a bowler adjusts mid-spell: the opening overs are probing and quick to set "
           "up (C1 — fast compile, baseline optimisation), and then, once enough data exists, the bowler "
           "commits to an aggressively optimised plan (C2 — inlining and dead-code elimination compiled to "
           "native code). The garbage collector is the dressing-room attendant who clears the kit of players "
           "already dismissed and off the field, reclaiming space from objects nothing references any more. The "
           "vtable is the batting scorecard: the captain checks once to see who bats at number three, then "
           "calls on them directly without re-checking for every single delivery, giving O(1) dispatch via a "
           "cached offset. "
           "The JVM's lazy loading and tiered JIT mean your application starts fast — not everything is "
           "compiled upfront — yet gets faster over time as hot paths are optimised, exactly the way a cricket "
           "team performs better deeper into a season once the analyst has gathered more data."),

        _s("code",
           "import java.util.*;\n\n"
           "class ScoreCard<T extends CricketPlayer> {\n"
           "    private final List<T> players = new ArrayList<>();\n\n"
           "    public void addPlayer(T p) {\n"
           "        players.add(p);\n"
           "    }\n\n"
           "    public Optional<T> getTopPerformer() {\n"
           "        return players.stream()\n"
           "            .max(Comparator.comparingInt(CricketPlayer::getRunsScored));\n"
           "    }\n\n"
           "    public void displayScoreCard() {\n"
           "        players.forEach(p ->\n"
           "            System.out.println(p.getStatSummary()));\n"
           "    }\n"
           "}\n\n"
           "// (Assumes CricketPlayer exposes getRunsScored() and getStatSummary().)\n\n"
           "public class ScoreCardDemo {\n"
           "    public static void main(String[] args) {\n"
           "        ScoreCard<Batsman> batting = new ScoreCard<>();\n"
           "        batting.addPlayer(new Batsman(\"Rohit Sharma\", \"India\", 48.5, 9847));\n"
           "        batting.addPlayer(new Batsman(\"Virat Kohli\", \"India\", 57.3, 13848));\n"
           "        batting.addPlayer(new Batsman(\"Shubman Gill\", \"India\", 44.1, 2271));\n\n"
           "        batting.getTopPerformer()\n"
           "            .ifPresent(b -> System.out.println(\"Top: \" + b.getStatSummary()));\n"
           "    }\n"
           "}",
           language="java"),

        _s("info_box",
           "Pro Tip: Avoid raw types (List instead of List<CricketPlayer>) — they bypass compile-time generics "
           "checks and surface as a ClassCastException at runtime. In Java 17+ records are ideal for immutable "
           "value objects like BallDelivery(int over, int ball, int runs, boolean isWicket) — they "
           "auto-generate equals/hashCode/toString with zero boilerplate."),

        _s("heading", "Common Patterns & Best Practices", level=2),

        _s("paragraph",
           "The Builder pattern solves the telescoping-constructor problem. A Match object needs team1, team2, "
           "venue, format, and overs, which naively spawns a ladder of overloaded constructors like "
           "Match(t1, t2, venue), Match(t1, t2, venue, format), and Match(t1, t2, venue, format, overs) — "
           "hard to read and easy to mis-order. A Builder instead provides a fluent API where each setter "
           "returns the builder, and validation happens in build(), so an invalid Match is impossible to "
           "construct. The Factory pattern decouples object creation from use: calling "
           "PlayerFactory.createBatsman() rather than `new Batsman()` lets tests inject fakes and centralises "
           "construction logic. The Strategy pattern externalises algorithms behind a common interface: a "
           "MatchScoringStrategy with T20ScoringStrategy and TestScoringStrategy implementations lets the same "
           "Match apply different rules without a sprawling if/else block, and new formats can be added without "
           "modifying existing code."),

        _s("analogy",
           "🏏 Think of it like cricket: Before an international match can be played, the ICC match referee must "
           "certify the playing conditions — the pitch report, the playing hours, the powerplay overs, DRS "
           "availability, and the ball brand. You cannot start the match without confirming each condition one "
           "by one, and if the host ground hasn't confirmed floodlights for a day-night Test, the referee "
           "won't sign off. The final \"match confirmed\" approval is given only when every condition has been "
           "validated together. "
           "The Builder pattern is the ICC's match-approval process. Each builder method — .withTeam1(), "
           ".withVenue(), .withFormat() — is like confirming one playing condition in turn. The build() method "
           "is the referee's final sign-off: it validates that all required conditions are met (both teams set? "
           "venue confirmed? format valid?) and throws an exception, refusing to play, if anything is missing. "
           "Without a Builder you'd hand everything to a raw constructor — like turning up at the ground "
           "without pre-confirming anything and hoping it all happens to be in order. The Strategy pattern maps "
           "to formats: the same Match class (the ground) can run T20ScoringStrategy (powerplay rules, super "
           "over), ODIScoringStrategy (50 overs, fielding restrictions), or TestScoringStrategy (no over limit, "
           "follow-on rule), swapping the format's rules in without touching the Match class itself. "
           "Builder and Strategy together eliminate the \"one giant class that knows everything\" problem — the "
           "same reason cricket keeps a separate Laws book, playing-conditions document, and tournament rules "
           "rather than cramming them into one unmanageable combined document."),

        _s("code",
           "enum Format { T20, ODI, TEST }\n\n"
           "public class Match {\n"
           "    private final String team1;\n"
           "    private final String team2;\n"
           "    private final String venue;\n"
           "    private final Format format;\n"
           "    private final int overs;\n\n"
           "    private Match(Builder b) {\n"
           "        this.team1 = b.team1;\n"
           "        this.team2 = b.team2;\n"
           "        this.venue = b.venue;\n"
           "        this.format = b.format;\n"
           "        this.overs = b.overs;\n"
           "    }\n\n"
           "    @Override\n"
           "    public String toString() {\n"
           "        return team1 + \" vs \" + team2 + \" @ \" + venue\n"
           "            + \" [\" + format + \", \" + overs + \" overs]\";\n"
           "    }\n\n"
           "    public static class Builder {\n"
           "        private String team1;\n"
           "        private String team2;\n"
           "        private String venue;\n"
           "        private Format format;\n"
           "        private int overs;\n\n"
           "        public Builder withTeam1(String t)  { this.team1 = t; return this; }\n"
           "        public Builder withTeam2(String t)  { this.team2 = t; return this; }\n"
           "        public Builder withVenue(String v)  { this.venue = v; return this; }\n"
           "        public Builder withFormat(Format f) { this.format = f; return this; }\n"
           "        public Builder withOvers(int o)     { this.overs = o; return this; }\n\n"
           "        public Match build() {\n"
           "            if (team1 == null || team2 == null)\n"
           "                throw new IllegalStateException(\"Both teams must be set\");\n"
           "            if (venue == null)\n"
           "                throw new IllegalStateException(\"Venue must be confirmed\");\n"
           "            if (format == null)\n"
           "                throw new IllegalStateException(\"Format must be set\");\n"
           "            if (format == Format.TEST) overs = 0; // unlimited\n"
           "            return new Match(this);\n"
           "        }\n"
           "    }\n\n"
           "    public static void main(String[] args) {\n"
           "        Match wc_final = new Match.Builder()\n"
           "            .withTeam1(\"India\")\n"
           "            .withTeam2(\"Australia\")\n"
           "            .withVenue(\"Narendra Modi Stadium\")\n"
           "            .withFormat(Format.ODI)\n"
           "            .withOvers(50)\n"
           "            .build();\n"
           "        System.out.println(wc_final);\n"
           "    }\n"
           "}",
           language="java"),

        _s("warning_box",
           "Warning: Never use == to compare Integer objects — Java caches Integer values only between -128 and "
           "127. A cricket scoreboard comparing playerScore == 150 will silently return false even when the "
           "score IS 150, because new Integer(150) != new Integer(150) (different heap objects). Always use "
           ".equals(): playerScore.equals(150). This catches hundreds of production bugs every year in Java "
           "codebases."),

        _s("heading", "Real-World Application", level=2),

        _s("paragraph",
           "Java powers a huge slice of the cricket-tech stack. Cricinfo's backend APIs serve scorecards and "
           "statistics, Dream11's fantasy platform handles 100M+ users during the IPL, and the BCCI's official "
           "scoring systems run on the JVM. Hotstar's streaming metadata service and the Android apps "
           "(Kotlin-on-JVM) that millions watch on are JVM-based, and Spring Boot microservices drive the "
           "real-time scoring pipelines that fan out live deliveries. Java 21's virtual threads (Project Loom) "
           "let a service maintain millions of simultaneous WebSocket connections for live score pushes without "
           "the cost of a thread-per-connection model — a capability that is critical at Hotstar's scale during "
           "a marquee India match."),

        _s("key_points", "",
           items=[
               "JVM vtable dispatch enables polymorphism with O(1) overhead — no runtime type checks needed in calling code",
               "Generics with bounded wildcards catch ClassCastException at compile time, not as a production crash at 2am",
               "Builder pattern with validation in build() makes invalid object state physically impossible to construct or pass around",
               "JIT C2 compiler inlines virtual method calls after profiling, eliminating polymorphism overhead in the hottest code paths",
               "Java checked exceptions force explicit error handling at the API boundary — unchecked exceptions propagate silently and crash production",
               "G1GC concurrent marking means garbage collection no longer requires long stop-the-world pauses that freeze live scoring systems",
           ]),

        _s("quiz",
           "A List<CricketPlayer> contains Batsman and Bowler objects. You call player.play() in a loop. Which "
           "mechanism determines the correct implementation runs for each player?",
           items=[
               "Static binding at compile time based on the declared List<CricketPlayer> type",
               "Dynamic dispatch via vtable lookup at runtime based on the actual object type",
               "instanceof check inserted by the compiler before each call",
               "The @Override annotation tells the JVM which method to call",
           ],
           answer=1,
           explanation="Java uses dynamic dispatch for all non-static, non-private, non-final instance methods. "
           "The JVM maintains a vtable per class. At runtime, the vtable of the actual object (Batsman or "
           "Bowler) is looked up, not the declared reference type (CricketPlayer). @Override only catches typos "
           "at compile time — it plays no role in runtime dispatch."),

        _s("quiz",
           "Your cricket app stores match scores as Integer in a Map<String,Integer>. A test for "
           "scores.get('Kohli') == 150 passes consistently in dev but randomly fails in production for scores "
           "above 127. Root cause?",
           items=[
               "Integer overflow above 127 corrupts the value",
               "JVM Integer cache covers -128 to 127; above 127 each Integer.valueOf() creates a new heap object so == compares references, not values",
               "Map.get() returns null for scores above 127",
               "The Integer type is not comparable above 127 without Comparable",
           ],
           answer=1,
           explanation="Java's Integer cache pools objects from -128 to 127, so Integer.valueOf(100) always "
           "returns the same object and == works. For values like 150, each boxing operation creates a fresh "
           "object on the heap — == compares memory addresses, not values. The fix is always using .equals() "
           "for object equality, or unboxing to int: scores.get('Kohli').intValue() == 150."),
    ],
}


lesson2_system_design = {
    "lessonId": "cricket-v3-2",
    "title": "System Design: Deep Dive & Advanced Patterns",
    "type": "reading",
    "topicName": "System Design",
    "estimatedMinutes": 30,
    "xpReward": 75,
    "generated": True,
    "sections": [
        _s("heading", "Overview", level=2),

        _s("paragraph",
           "System design covers the discipline of building distributed architectures for massive scale: how "
           "to serve millions of users without a single server buckling, how to keep data consistent across "
           "databases spread across continents, and how to recover gracefully from partial failures rather "
           "than collapsing entirely. Every meaningful decision is a trade-off — latency versus consistency, "
           "availability versus correctness, simplicity versus scalability — and a good design makes those "
           "trade-offs deliberately rather than by accident. There is rarely a single right answer; there is "
           "only the answer that best fits the failure modes your users can tolerate and the load your system "
           "must absorb at peak. This lesson works through the foundational ideas that recur in every "
           "large-scale system: the CAP theorem and its trade-offs, horizontal sharding via consistent "
           "hashing, caching patterns that shield the database, and event-driven architecture for "
           "decoupling, audit, and recovery."),

        _s("analogy",
           "🏏 Think of it like cricket: The 2023 Cricket World Cup was broadcast simultaneously in 50+ "
           "countries to roughly 800 million viewers. No single TV tower could serve that, so Star Sports ran "
           "regional broadcast centres in Mumbai, Dubai, London, and Sydney, each serving local viewers, and "
           "if the Mumbai centre went down, Indian viewers were rerouted to Dubai. Yet the final score still "
           "had to appear on every screen at virtually the same moment. "
           "System design is exactly this infrastructure problem applied to software. The regional broadcast "
           "centres are distributed servers spread close to users. \"Every screen shows the same score "
           "simultaneously\" is the consistency requirement. \"Reroute to Dubai if Mumbai goes down\" is "
           "availability and fault tolerance in action. The CAP theorem governs the hard choice that surfaces "
           "during the reroute itself: while Mumbai is failing over (a network partition), did viewers get a "
           "slightly stale score — available but eventually consistent, the AP choice — or did the stream "
           "pause entirely until Mumbai recovered — consistent but unavailable, the CP choice? "
           "Every distributed-system decision is ultimately a version of this question: what do your users "
           "experience when something goes wrong? The answer is precisely the CAP trade-off you have made."),

        _s("heading", "Core Concepts — The CAP Theorem", level=2),

        _s("paragraph",
           "The CAP theorem states that a distributed system can guarantee at most two of three properties: "
           "Consistency (every read returns the most recent write or an error), Availability (every request "
           "receives a non-error response, though possibly stale), and Partition Tolerance (the system keeps "
           "operating despite the network splitting into groups that cannot communicate). Because network "
           "partitions are unavoidable in any real distributed system — links fail, packets drop, datacentres "
           "isolate — partition tolerance is not optional. The genuine choice is therefore between CP "
           "(consistent but possibly unavailable during a partition) and AP (always available but possibly "
           "serving stale data during a partition). PostgreSQL with synchronous replication and ZooKeeper are "
           "CP systems that refuse to serve uncertain data; Cassandra, DynamoDB, and DNS are AP systems that "
           "favour returning something over returning nothing. PACELC extends the model: Else (when there is "
           "no partition) you still trade Latency against Consistency, because waiting for more replicas to "
           "acknowledge a write makes it slower but safer."),

        _s("analogy",
           "🏏 Think of it like cricket: Consider the DRS (Decision Review System) in Test cricket. When a "
           "batsman is given out LBW and reviews, the third umpire checks ball-tracking and UltraEdge data "
           "from a central server. Imagine that during a tense session the link between the ball-tracking "
           "cameras and the third umpire's review screen briefly drops. The third umpire now has two choices: "
           "wait for connectivity to be restored, potentially pausing play for minutes, or rule on the last "
           "available data. "
           "That connectivity drop IS a network partition — the distributed system of cameras, review screen, "
           "and central server has split. CP behaviour is the third umpire refusing to give a verdict until "
           "full connectivity returns: the review is delayed (unavailable), but when it comes it rests on "
           "complete, consistent data. AP behaviour is the third umpire ruling on the last-known data from "
           "before the partition: play continues (available), but the decision risks being wrong "
           "(inconsistent). The on-field umpire's original decision maps neatly to a \"stale read\" in an AP "
           "system — correct at the moment of delivery, but made before the full tracking data was available. "
           "Even the \"umpire's call\" margin is, in effect, a consistency window: within that margin a small "
           "inconsistency is explicitly accepted. "
           "CAP is therefore not about a system being \"good\" or \"bad\" — it is about which failures your "
           "users can tolerate. A score app is fine with AP (a five-second-stale score harms nobody), whereas "
           "a DRS verdict demands CP, because a wrong wicket call carries real consequences."),

        _s("code",
           "                         CRICINFO-STYLE LIVE SCORE ARCHITECTURE\n"
           "                         (CAP choice annotated per component)\n\n"
           "   800M viewers\n"
           "        |\n"
           "        v\n"
           "  +---------------------+   AP  -> stale edge scores OK; latency is king\n"
           "  | CloudFront CDN      |       (TTL = 10s; serves cached score pages)\n"
           "  | TTL = 10s           |\n"
           "  +---------------------+\n"
           "        |\n"
           "        v\n"
           "  +---------------------+\n"
           "  | API Gateway         |       routing / auth / rate limiting\n"
           "  +---------------------+\n"
           "        |\n"
           "        v\n"
           "  +---------------------+\n"
           "  | Score Ingestion     |       validates each ball event\n"
           "  | Lambda              |\n"
           "  +---------------------+\n"
           "        |\n"
           "        v\n"
           "  +---------------------+   durable + ordered (AP on the write path:\n"
           "  | Kafka               |       writes succeed even if downstream is slow)\n"
           "  +---------------------+\n"
           "        |\n"
           "   +----+--------------------------+\n"
           "   |                               |\n"
           "   v                               v\n"
           "  +---------------------+    +---------------------------+\n"
           "  | Redis Cache         |    | PostgreSQL Primary        |\n"
           "  | AP, TTL = 5s        |    | CP, synchronous replica   |\n"
           "  | (1-2 balls stale OK)|    | (authoritative record)    |\n"
           "  +---------------------+    +---------------------------+\n"
           "        |\n"
           "        v\n"
           "  +---------------------+\n"
           "  | WebSocket Push      |       proactively pushes updates\n"
           "  | Service             |       (no client polling)\n"
           "  +---------------------+\n"
           "        |\n"
           "        v\n"
           "     Mobile apps",
           language="text"),

        _s("paragraph",
           "Walking through each layer's CAP choice: the CDN is AP, because a slightly stale score at the edge "
           "is acceptable while low latency is critical for 800M viewers. Kafka sits on the write path as a "
           "durable, ordered, available log — writes succeed even when downstream consumers lag, which is "
           "effectively an AP posture for ingestion. Redis is AP, trading a one-to-two-ball staleness for "
           "sub-millisecond reads that absorb the bulk of traffic. PostgreSQL is CP: as the authoritative "
           "record with synchronous replication, it would rather reject a read than serve data it cannot "
           "confirm is current. The WebSocket push service sidesteps the CP-versus-AP read dilemma entirely by "
           "pushing updates proactively, so clients receive fresh scores without ever issuing a read that "
           "could hit a partition."),

        _s("heading", "How It Works Under the Hood — Consistent Hashing", level=2),

        _s("paragraph",
           "When 10 IPL matches run simultaneously, the data must be distributed across multiple database "
           "shards so that no single node becomes a bottleneck. The naive approach, modulo sharding "
           "(match_id % num_shards), works until you add or remove a shard — at which point nearly every key "
           "remaps to a different node, forcing a catastrophic full data migration. Consistent hashing avoids "
           "this by placing both data keys and server nodes onto a circular hash ring spanning 0 to 2^32 - 1. "
           "Each key is owned by the first node encountered moving clockwise from the key's position. Adding a "
           "node only moves the keys that fall between the new node and its predecessor — roughly 1/N of the "
           "total — leaving everything else untouched. To prevent uneven distribution when nodes are few, each "
           "physical server is mapped to many virtual nodes (vnodes), commonly around 150 positions on the "
           "ring, which smooths load and lets more powerful servers claim proportionally more positions. This "
           "is the mechanism behind DynamoDB, Cassandra, and Amazon's original Dynamo."),

        _s("analogy",
           "🏏 Think of it like cricket: In the IPL, eight teams play a round-robin league across ten venues in "
           "different cities — Mumbai, Delhi, Chennai, Bangalore, and so on — and the BCCI uses a fixture "
           "algorithm to assign matches to venues. If that algorithm naively assigned matches by \"match "
           "number mod 5\", adding a new venue such as Lucknow would force every single fixture across every "
           "team to be reshuffled, and the whole schedule would collapse. Consistent hashing instead places "
           "venues and teams on a circular schedule wheel, where each team plays at the nearest venue "
           "clockwise. "
           "That circular schedule wheel is the hash ring. Teams are the data keys hashed onto the ring, and "
           "venues are the database nodes hashed onto the same ring. Each team playing at its nearest "
           "clockwise venue is exactly each key being stored at its nearest clockwise node. When Lucknow is "
           "added as a new node, only the teams that previously belonged to the node immediately "
           "anti-clockwise of Lucknow's position need to move — about 1/N of the total — while every other "
           "fixture stays exactly where it was. Virtual nodes are like a single venue hosting several "
           "\"virtual grounds\": a larger stadium (a more powerful server) is given more positions on the "
           "schedule wheel and therefore naturally attracts proportionally more matches. "
           "The circular ring is what makes consistent hashing genuinely \"consistent\" — adding or removing a "
           "node causes minimal, predictable disruption instead of a full reshuffle, which is why it underpins "
           "essentially every major distributed database."),

        _s("code",
           "import hashlib\n"
           "from bisect import bisect, insort\n\n\n"
           "class ConsistentHashRing:\n"
           "    def __init__(self, replicas=150):\n"
           "        self.replicas = replicas        # virtual nodes per physical node\n"
           "        self._ring = {}                 # hash position -> node name\n"
           "        self._sorted_keys = []          # sorted hash positions\n\n"
           "    def _hash(self, key):\n"
           "        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n"
           "    def add_node(self, node):\n"
           "        for i in range(self.replicas):\n"
           "            h = self._hash(f\"{node}:{i}\")\n"
           "            self._ring[h] = node\n"
           "            insort(self._sorted_keys, h)\n\n"
           "    def remove_node(self, node):\n"
           "        for i in range(self.replicas):\n"
           "            h = self._hash(f\"{node}:{i}\")\n"
           "            self._ring.pop(h, None)\n"
           "            idx = bisect(self._sorted_keys, h) - 1\n"
           "            if idx >= 0 and self._sorted_keys[idx] == h:\n"
           "                self._sorted_keys.pop(idx)\n\n"
           "    def get_node(self, key):\n"
           "        if not self._ring:\n"
           "            return None\n"
           "        h = self._hash(key)\n"
           "        idx = bisect(self._sorted_keys, h) % len(self._sorted_keys)\n"
           "        return self._ring[self._sorted_keys[idx]]\n\n\n"
           "if __name__ == \"__main__\":\n"
           "    ring = ConsistentHashRing()\n"
           "    for node in [\"db-mumbai\", \"db-delhi\", \"db-chennai\"]:\n"
           "        ring.add_node(node)\n\n"
           "    matches = [\"match-1001\", \"match-1002\", \"match-1003\",\n"
           "               \"match-1004\", \"match-1005\"]\n\n"
           "    before = {m: ring.get_node(m) for m in matches}\n"
           "    print(\"Before adding db-kolkata:\")\n"
           "    for m, n in before.items():\n"
           "        print(f\"  {m} -> {n}\")\n\n"
           "    ring.add_node(\"db-kolkata\")\n"
           "    after = {m: ring.get_node(m) for m in matches}\n"
           "    moved = [m for m in matches if before[m] != after[m]]\n\n"
           "    print(\"\\nAfter adding db-kolkata:\")\n"
           "    for m, n in after.items():\n"
           "        flag = \"  (moved)\" if before[m] != after[m] else \"\"\n"
           "        print(f\"  {m} -> {n}{flag}\")\n"
           "    print(f\"\\nOnly {len(moved)} of {len(matches)} matches moved: {moved}\")",
           language="python"),

        _s("info_box",
           "Pro Tip: For cricket score reads (ratio easily 10000:1 reads vs writes during a live match), "
           "combine Redis PUBLISH/SUBSCRIBE with write-through caching. Each score update writes to PostgreSQL "
           "AND Redis simultaneously, and Redis publishes the event to all WebSocket subscriber channels. "
           "Clients never poll — they receive pushes. This pattern served Hotstar's 25.3M concurrent IPL "
           "viewers."),

        _s("heading", "Common Patterns — CQRS, Event Sourcing & Circuit Breaker", level=2),

        _s("paragraph",
           "CQRS (Command Query Responsibility Segregation) splits the write path from the read path: commands "
           "that change state (record a ball delivery) are handled separately from queries that read state "
           "(fetch a scorecard), so each side can be modelled and scaled independently. Event Sourcing stores "
           "every state change as an immutable, append-only event — BallDelivered, WicketFallen, BoundaryHit — "
           "and the current scorecard becomes a projection derived by replaying those events. This yields a "
           "complete audit trail and time-travel queries such as \"what was the score at 30 overs?\" simply by "
           "replaying up to that point. The Circuit Breaker pattern prevents cascading failures by tracking "
           "the failure rate of calls to a downstream dependency (a Cricinfo data provider); when failures "
           "exceed a threshold the breaker \"opens\" and fails fast instead of piling up doomed calls, then "
           "after a timeout it enters a half-open state to test whether the dependency has recovered before "
           "fully closing again."),

        _s("analogy",
           "🏏 Think of it like cricket: In a live broadcast the production team splits roles cleanly. The "
           "official scorer records every ball in the paper scorebook — the write side — while the graphics "
           "team reads from that record to update the on-screen scorecard — the read side. These never mix: "
           "the scorer doesn't touch the TV graphics, and the graphics operator never writes in the official "
           "scorebook. If the graphics system crashes mid-match, the scorer keeps recording every delivery "
           "undisturbed, and the scorebook is strictly append-only — a dismissal is never erased, it is added "
           "as a \"dismissed\" annotation to that batsman's row. "
           "CQRS maps directly: the official scorebook is the event store (append-only, write-optimised), "
           "while the TV graphics system is the read model (denormalised and query-optimised, with "
           "pre-computed strike rates, economy rates, and partnership displays). Event Sourcing means every "
           "ball is an immutable event — BallDelivered(over=14, ball=3, runs=4, batsman=\"Kohli\", "
           "bowler=\"Bumrah\") — and the scorecard is a materialised view obtained by replaying those events; "
           "\"what was India's score at exactly 30.4 overs?\" is answered by replaying events up to that point, "
           "giving time-travel queries for free. The Circuit Breaker is the DRS fail-safe: if the ball-tracking "
           "cameras return errors on more than five consecutive reviews (the failure threshold), the third "
           "umpire stops attempting DRS (the circuit opens and fails fast) and relies solely on on-field "
           "decisions until a half-open test after the timeout confirms the cameras are working again. "
           "Event Sourcing removes the \"what happened to cause this state?\" mystery — every cricket-app bug "
           "of the form \"why does India show 247/7 instead of 248/7?\" is solved by replaying the event log, "
           "the same way a scorer can reconstruct the exact chain of deliveries behind any scorecard "
           "discrepancy."),

        _s("code",
           "import time\n"
           "from enum import Enum\n\n\n"
           "class State(Enum):\n"
           "    CLOSED = \"CLOSED\"\n"
           "    OPEN = \"OPEN\"\n"
           "    HALF_OPEN = \"HALF_OPEN\"\n\n\n"
           "class CircuitOpenError(Exception):\n"
           "    pass\n\n\n"
           "class CircuitBreaker:\n"
           "    def __init__(self, threshold=5, timeout=30):\n"
           "        self.failure_threshold = threshold\n"
           "        self.reset_timeout = timeout\n"
           "        self.failure_count = 0\n"
           "        self.state = State.CLOSED\n"
           "        self.last_failure_time = 0.0\n\n"
           "    def call(self, func, *args, **kwargs):\n"
           "        if self.state == State.OPEN:\n"
           "            if time.time() - self.last_failure_time >= self.reset_timeout:\n"
           "                self.state = State.HALF_OPEN  # time to test recovery\n"
           "            else:\n"
           "                raise CircuitOpenError(\"Circuit is OPEN; failing fast\")\n\n"
           "        try:\n"
           "            result = func(*args, **kwargs)\n"
           "        except Exception:\n"
           "            self._on_failure()\n"
           "            raise\n"
           "        else:\n"
           "            self._on_success()\n"
           "            return result\n\n"
           "    def _on_success(self):\n"
           "        self.failure_count = 0\n"
           "        self.state = State.CLOSED\n\n"
           "    def _on_failure(self):\n"
           "        self.failure_count += 1\n"
           "        self.last_failure_time = time.time()\n"
           "        if self.failure_count >= self.failure_threshold:\n"
           "            self.state = State.OPEN\n\n\n"
           "if __name__ == \"__main__\":\n"
           "    cricinfo_breaker = CircuitBreaker(threshold=5, timeout=30)\n\n"
           "    def fetch_score():\n"
           "        raise ConnectionError(\"Cricinfo provider unreachable\")\n\n"
           "    for attempt in range(1, 8):\n"
           "        try:\n"
           "            cricinfo_breaker.call(fetch_score)\n"
           "        except CircuitOpenError:\n"
           "            print(f\"Attempt {attempt}: circuit OPEN — fast fail (DB/cache fallback)\")\n"
           "        except ConnectionError:\n"
           "            print(f\"Attempt {attempt}: downstream failed \"\n"
           "                  f\"(failures={cricinfo_breaker.failure_count}, \"\n"
           "                  f\"state={cricinfo_breaker.state.value})\")",
           language="python"),

        _s("warning_box",
           "Warning: Never model cricket events as mutable UPDATE statements — UPDATE matches SET "
           "total_runs = 247 loses all history. When a bug reports 'India shows 246 but should be 247', you "
           "have no way to trace which ball was miscounted. Model every delivery as an immutable INSERT "
           "(BallDelivered event). The scorecard is a VIEW derived from events. This isn't just good practice — "
           "it's the only architecture that enables DRS-style retrospective review of your data."),

        _s("heading", "Real-World Application", level=2),

        _s("paragraph",
           "Hotstar's 25.3M concurrent viewers during the IPL 2023 final relied on Kafka for ball-event "
           "streaming, Redis clusters for the live score cache, and consistent hashing for DynamoDB "
           "partitioning, so that load spread evenly across nodes even under sudden surges. Dream11's fantasy "
           "points recalculation uses CQRS — ball events flowing through Kafka trigger a read-model update for "
           "every fantasy team in that match, keeping the write path lean and the read path pre-computed. "
           "Cricinfo serves its score pages from CDN edge caches (AP) with a 10-second TTL to absorb global "
           "read traffic close to users. These are not academic patterns; they are the production architecture "
           "of every major cricket platform operating at scale."),

        _s("key_points", "",
           items=[
               "CAP requires choosing CP or AP per component — not for the whole system — based on what staleness means for each layer",
               "Consistent hashing moves only 1/N of data when adding a node, vs 100% reshuffling for modulo partitioning",
               "CQRS with Event Sourcing gives free time-travel queries: replay events to reconstruct state at any historical point",
               "Circuit breaker's three states (closed/open/half-open) prevent cascade failures without manual intervention or deployment changes",
               "Write-through cache + Redis PUBLISH eliminates polling — each score update simultaneously writes DB, updates cache, and pushes to all WebSocket clients",
               "Immutable event log (append-only) is the only data model that supports both audit trail and retrospective bug investigation",
           ]),

        _s("quiz",
           "During the India vs Pakistan World Cup semi-final, your live score database has a network "
           "partition. Your system is CP. A user in Delhi requests the live score. What does the user "
           "experience?",
           items=[
               "The user sees the last cached score (may be a few balls stale)",
               "The user receives an error or timeout — the CP system refuses to respond rather than serve potentially inconsistent data",
               "The system automatically switches to AP mode for 30 seconds",
               "The request is queued and answered once the partition heals, transparently",
           ],
           answer=1,
           explanation="CP systems prioritise consistency over availability. During a partition, a CP node "
           "cannot confirm it has the latest data, so it returns an error rather than risk serving stale data. "
           "This is correct for banking (never show wrong balance) but often too strict for sports scores, "
           "where AP (serve stale, show 'updated 5s ago') is better UX."),

        _s("quiz",
           "Your cricket live score API handles 2M req/s at IPL peak. Scores update every 30 seconds (one "
           "over). Which caching strategy minimises database load while preventing stale data beyond 30 "
           "seconds?",
           items=[
               "Cache-aside with TTL=30s: on cache miss, fetch from DB and populate",
               "Write-through with TTL=30s: every score update writes to both DB and cache simultaneously",
               "No cache — use 10 read replicas to distribute load",
               "Edge CDN only with TTL=5s",
           ],
           answer=1,
           explanation="Write-through ensures the cache always has fresh data the moment a score update "
           "occurs — there are no cache misses to cause thundering herds. Cache-aside suffers from thundering "
           "herd after TTL expiry: millions of users simultaneously miss cache and hammer the database. With "
           "write-through, the DB write and cache write happen together — cache is always warm and always "
           "fresh."),
    ],
}


lessons = [lesson1_java, lesson2_system_design]

if __name__ == "__main__":
    import json
    for l in lessons:
        analogies = [s for s in l['sections'] if s['type']=='analogy']
        print(f"[{l['type']:8s}] {l['title'][:55]} — {len(l['sections'])} sections, {len(analogies)} analogies")
        for i, a in enumerate(analogies, 1):
            words = len(a['content'].split())
            print(f"  Analogy {i}: {words} words — {a['content'][:80]}...")
