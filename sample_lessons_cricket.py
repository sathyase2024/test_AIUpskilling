# Cricket-personalised AI upskilling lessons
# Each lesson is a plain dict matching the platform schema.

lesson1 = {
    "lessonId": "cricket-1",
    "title": "Java Mastery: Introduction & Core Concepts",
    "type": "reading",
    "topicName": "Java Mastery",
    "estimatedMinutes": 30,
    "xpReward": 75,
    "generated": True,
    "sections": [
        {
            "type": "heading",
            "content": "Overview",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "Just as a cricket match has structured innings with clear rules for every "
                "player type, Java uses object-oriented programming to model real-world entities "
                "with well-defined contracts. A batsman knows how to bat, a bowler knows how to "
                "bowl, and an umpire enforces the laws, all without needing to know each other's "
                "internal mechanics. Java captures exactly this kind of structure: each object "
                "encapsulates its own state and behaviour while exposing a clean public interface. "
                "This discipline is why Java dominates enterprise systems. Spring Boot powers banking "
                "back-ends and microservices, Android runs billions of phones, and large financial "
                "institutions trust the JVM for its stability, strong typing, mature tooling, and "
                "decades of battle-tested libraries. Like a well-drilled cricket team, Java code is "
                "predictable, maintainable, and scales gracefully from a club scoreboard to a global "
                "tournament platform serving millions of fans simultaneously."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Core Concepts",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "In Java, a class is a blueprint, much like the role description for a cricketer. "
                "The CricketPlayer class defines what every player has (a name, a jersey number) and "
                "what every player can do. Inheritance lets you build a hierarchy: Batsman and Bowler "
                "both extend CricketPlayer, inheriting common traits while specialising behaviour. "
                "Interfaces model cricket roles independent of the inheritance tree. A single player can "
                "be both a Batsman and a Captain, exactly like a class implementing multiple interfaces, "
                "because Captain is a contract of responsibilities (leading the field, making the toss "
                "call) rather than a kind of player. Polymorphism is the substitution principle in "
                "action: when the twelfth man replaces an injured fielder, the match continues calling "
                "the same fieldBall() method, and the right behaviour runs for whoever is on the pitch. "
                "Your code holds references of type CricketPlayer but the actual object decides which "
                "overridden method executes at runtime."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "import java.util.ArrayList;\n"
                "import java.util.List;\n\n"
                "abstract class CricketPlayer {\n"
                "    protected final String name;\n"
                "    protected final int jerseyNumber;\n\n"
                "    protected CricketPlayer(String name, int jerseyNumber) {\n"
                "        this.name = name;\n"
                "        this.jerseyNumber = jerseyNumber;\n"
                "    }\n\n"
                "    // Abstract method: every player type must define its own role.\n"
                "    public abstract String getRole();\n\n"
                "    public String getName() { return name; }\n"
                "}\n\n"
                "// A role contract, independent of the class hierarchy.\n"
                "interface Captain {\n"
                "    String callToss();\n"
                "}\n\n"
                "class Batsman extends CricketPlayer implements Captain {\n"
                "    private final int battingAverage;\n\n"
                "    public Batsman(String name, int jerseyNumber, int battingAverage) {\n"
                "        super(name, jerseyNumber);\n"
                "        this.battingAverage = battingAverage;\n"
                "    }\n\n"
                "    @Override\n"
                "    public String getRole() {\n"
                "        return name + \" is a Batsman (avg \" + battingAverage + \")\";\n"
                "    }\n\n"
                "    @Override\n"
                "    public String callToss() {\n"
                "        return name + \" calls Heads as captain\";\n"
                "    }\n"
                "}\n\n"
                "class Bowler extends CricketPlayer {\n"
                "    private final double economyRate;\n\n"
                "    public Bowler(String name, int jerseyNumber, double economyRate) {\n"
                "        super(name, jerseyNumber);\n"
                "        this.economyRate = economyRate;\n"
                "    }\n\n"
                "    @Override\n"
                "    public String getRole() {\n"
                "        return name + \" is a Bowler (economy \" + economyRate + \")\";\n"
                "    }\n"
                "}\n\n"
                "public class MatchLineup {\n"
                "    public static void main(String[] args) {\n"
                "        List<CricketPlayer> lineup = new ArrayList<>();\n"
                "        lineup.add(new Batsman(\"Virat Kohli\", 18, 58));\n"
                "        lineup.add(new Bowler(\"Jasprit Bumrah\", 93, 4.6));\n\n"
                "        // Polymorphism: same call, subtype-specific behaviour at runtime.\n"
                "        for (CricketPlayer player : lineup) {\n"
                "            System.out.println(player.getRole());\n"
                "        }\n\n"
                "        // A Batsman who is also a Captain.\n"
                "        Batsman skipper = (Batsman) lineup.get(0);\n"
                "        System.out.println(skipper.callToss());\n"
                "    }\n"
                "}"
            ),
            "language": "java",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "The abstract method getRole() in CricketPlayer is a promise without an implementation: "
                "the class declares that every player must define a role, but refuses to say how, so you "
                "cannot instantiate a bare CricketPlayer. Batsman and Bowler each provide their own "
                "@Override of getRole(), giving subtype-specific behaviour. When you loop over the "
                "List<CricketPlayer> and call player.getRole(), the compiler only knows the reference is a "
                "CricketPlayer, but the JVM performs dynamic dispatch: it consults the actual object's "
                "method table (vtable) at runtime and invokes the correct overridden method. That is why "
                "Kohli prints batsman text and Bumrah prints bowler text from a single call site."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "How It Works Under the Hood",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "When you compile MatchLineup.java with javac, you get .class files containing platform-"
                "independent bytecode, the cricket equivalent of a standardised scorecard format every "
                "ground understands. At runtime the class loader subsystem reads each .class file, verifies "
                "the bytecode, and loads classes lazily, so Bowler is only loaded the first time Bumrah is "
                "created. Newly created objects, such as a Scoreboard tracking live runs, live on the heap "
                "and are shared and garbage-collected when no longer referenced. Each method invocation "
                "pushes a frame onto the thread's stack holding local variables and the operand stack; when "
                "updateScore() returns, its frame pops off. Initially the JVM interprets bytecode, but "
                "HotSpot's JIT compiler watches for hot methods (a scoreboard refresh called every ball) "
                "and compiles them to optimised native machine code, so a long innings runs progressively "
                "faster as the code warms up."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "import java.util.ArrayList;\n"
                "import java.util.Comparator;\n"
                "import java.util.HashMap;\n"
                "import java.util.List;\n"
                "import java.util.Map;\n\n"
                "// Generic scorecard bounded to cricket players only.\n"
                "class ScoreCard<T extends CricketPlayer> {\n"
                "    private final List<T> players = new ArrayList<>();\n"
                "    private final Map<String, Integer> runTally = new HashMap<>();\n\n"
                "    public void record(T player, int runs) {\n"
                "        players.add(player);\n"
                "        runTally.merge(player.getName(), runs, Integer::sum);\n"
                "    }\n\n"
                "    public Map<String, Integer> getRunTally() { return runTally; }\n\n"
                "    // Sort players by runs scored, highest first.\n"
                "    public List<T> sortedByRuns() {\n"
                "        List<T> sorted = new ArrayList<>(players);\n"
                "        sorted.sort(Comparator.comparingInt(\n"
                "                (T p) -> runTally.getOrDefault(p.getName(), 0)).reversed());\n"
                "        return sorted;\n"
                "    }\n\n"
                "    public static void main(String[] args) {\n"
                "        ScoreCard<Batsman> indiaTop = new ScoreCard<>();\n"
                "        indiaTop.record(new Batsman(\"Rohit Sharma\", 45, 49), 67);\n"
                "        indiaTop.record(new Batsman(\"Shubman Gill\", 77, 47), 92);\n\n"
                "        for (Batsman b : indiaTop.sortedByRuns()) {\n"
                "            System.out.println(b.getName() + \": \"\n"
                "                    + indiaTop.getRunTally().get(b.getName()) + \" runs\");\n"
                "        }\n"
                "    }\n"
                "}"
            ),
            "language": "java",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "info_box",
            "content": (
                "Pro Tip: When modelling a player's roles such as BATSMAN, BOWLER, WICKETKEEPER, and "
                "CAPTAIN, reach for EnumSet instead of manual bitwise int flags. EnumSet is internally "
                "backed by a single long bit vector, so it is as fast and compact as hand-rolled flags but "
                "fully type-safe and readable: EnumSet.of(Role.BATSMAN, Role.CAPTAIN). A non-obvious "
                "performance insight: the JVM's HotSpot JIT only optimises a method after it crosses an "
                "invocation threshold (roughly 10,000 calls), so micro-benchmarking your scorecard logic "
                "on the very first innings gives misleading 'cold' numbers. Always warm up the JIT with a "
                "few thousand iterations before trusting timing results."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Common Patterns & Best Practices",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "Three patterns recur constantly in cricket-domain Java. The Builder pattern assembles "
                "complex Match objects step by step, so you can set teams, venue, and format fluently and "
                "only produce an immutable Match once everything is valid. This is crucial because a match "
                "with no teams is nonsense: Builder.build() can reject invalid state before any object "
                "escapes into the system, preventing half-constructed matches from corrupting your "
                "scoreboard. The Factory pattern centralises creation of player types: a PlayerFactory "
                "decides whether to return a Batsman, Bowler, or AllRounder based on a role string from a "
                "team sheet, keeping construction logic in one place. The Strategy pattern swaps scoring "
                "rules at runtime: a T20ScoringStrategy and a TestScoringStrategy implement a common "
                "interface, so the same engine computes results differently for an IPL fixture versus a "
                "five-day Test, without sprawling if-else chains."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "public final class Match {\n"
                "    private final String teamA;\n"
                "    private final String teamB;\n"
                "    private final String venue;\n"
                "    private final String format;\n\n"
                "    private Match(Builder builder) {\n"
                "        this.teamA = builder.teamA;\n"
                "        this.teamB = builder.teamB;\n"
                "        this.venue = builder.venue;\n"
                "        this.format = builder.format;\n"
                "    }\n\n"
                "    public static class Builder {\n"
                "        private String teamA;\n"
                "        private String teamB;\n"
                "        private String venue = \"TBD\";\n"
                "        private String format = \"T20\";\n\n"
                "        public Builder teams(String a, String b) {\n"
                "            this.teamA = a;\n"
                "            this.teamB = b;\n"
                "            return this;\n"
                "        }\n\n"
                "        public Builder venue(String venue) {\n"
                "            this.venue = venue;\n"
                "            return this;\n"
                "        }\n\n"
                "        public Builder format(String format) {\n"
                "            this.format = format;\n"
                "            return this;\n"
                "        }\n\n"
                "        public Match build() {\n"
                "            if (teamA == null || teamB == null) {\n"
                "                throw new IllegalStateException(\n"
                "                        \"A match needs two teams\");\n"
                "            }\n"
                "            if (teamA.equals(teamB)) {\n"
                "                throw new IllegalStateException(\n"
                "                        \"A team cannot play itself\");\n"
                "            }\n"
                "            return new Match(this);\n"
                "        }\n"
                "    }\n\n"
                "    public static void main(String[] args) {\n"
                "        Match finalMatch = new Match.Builder()\n"
                "                .teams(\"India\", \"Australia\")\n"
                "                .venue(\"Narendra Modi Stadium\")\n"
                "                .format(\"ODI World Cup Final\")\n"
                "                .build();\n"
                "        System.out.println(\"Match created at \" + finalMatch.venue);\n"
                "    }\n"
                "}"
            ),
            "language": "java",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "warning_box",
            "content": (
                "Warning: Accessing player statistics that may be absent is a classic NullPointerException "
                "trap. If you write int sr = player.getStats().getStrikeRate() and a debutant has no stats "
                "yet, getStats() returns null and your scoreboard crashes mid-over. Never let null leak "
                "through your API. Return Optional<Integer> for values that might not exist and force "
                "callers to handle the empty case: int runs = player.getRuns().orElse(0). This converts a "
                "lurking runtime crash into an explicit, compile-time-visible decision about what to do "
                "when a player has not yet faced a ball."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Real-World Application",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "Platforms like ESPNcricinfo, Dream11, and the BCCI's official apps lean heavily on Java and "
                "Spring Boot to expose match data APIs, push real-time ball-by-ball scoring, and crunch "
                "player analytics. A Spring Boot service models each Match, Innings, and Player as domain "
                "objects, exposes REST endpoints for scorecards, and uses dependency injection to wire "
                "repositories and services cleanly. The very same OOP principles you saw, encapsulation, "
                "polymorphism, and well-defined interfaces, are what let these systems scale from a single "
                "club fixture to millions of concurrent fans refreshing scores during an India-Pakistan "
                "World Cup clash without rewriting the core domain model."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "key_points",
            "content": "",
            "language": "",
            "level": 2,
            "items": [
                "Encapsulation hides a Batsman's internal stats behind methods, so you change the scoring formula without breaking any code that reads runs.",
                "Abstract classes like CricketPlayer share common state and force subtypes to implement role-specific behaviour, while still preventing direct instantiation of a generic player.",
                "Interfaces such as Captain model capabilities orthogonal to the class tree, letting one Batsman also lead the side without multiple class inheritance.",
                "Polymorphic dispatch resolves player.getRole() at runtime via the object's method table, enabling one loop over List<CricketPlayer> to produce subtype-specific output.",
                "Favour immutability for identity: a final Match built through a Builder cannot drift into an invalid two-teams-missing state after construction completes.",
                "Use Optional<Integer> rather than null for stats that may be absent, turning silent NullPointerExceptions into explicit, well-handled empty cases."
            ],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "quiz",
            "content": (
                "A Bowler and Batsman both extend CricketPlayer. You store them in List<CricketPlayer> "
                "and call getRole(). Which Java mechanism enables different outputs for each subtype?"
            ),
            "language": "",
            "level": 2,
            "items": [
                "Method overloading resolved by the compiler based on argument types",
                "Runtime polymorphism via dynamic dispatch using the object's method table",
                "Static binding that fixes the method at compile time based on the reference type",
                "Generics type erasure substituting the concrete type at runtime"
            ],
            "answer": 1,
            "explanation": (
                "The reference type is CricketPlayer, but Java uses dynamic (late) binding for overridden "
                "instance methods. At runtime the JVM inspects the actual object, Batsman or Bowler, and "
                "consults its virtual method table to invoke the correct getRole() override. Overloading "
                "(A) is compile-time and based on signatures, static binding (C) would ignore the real "
                "object, and type erasure (D) concerns generics, not method dispatch."
            )
        },
        {
            "type": "quiz",
            "content": (
                "Your cricket app needs to track player statistics that change frequently but player "
                "identity (name, ID) never changes. Which Java design best models this?"
            ),
            "language": "",
            "level": 2,
            "items": [
                "Make the entire Player class mutable so any field can change at any time",
                "Make the entire Player class immutable, recreating it on every score update",
                "Model immutable identity fields (final name, ID) separately from a mutable stats object the player references",
                "Use only static fields so all players share one global statistics record"
            ],
            "answer": 2,
            "explanation": (
                "Identity should be immutable: a player's name and ID are set once and marked final, which "
                "makes them safe to use as map keys and share across threads. Frequently changing data like "
                "runs and strike rate belongs in a separate mutable Stats object. Fully mutable (A) risks "
                "corrupting identity, fully immutable (B) wastes allocations on every ball, and static "
                "fields (D) would wrongly merge every player's stats into one shared record."
            )
        }
    ]
}

lesson2 = {
    "lessonId": "cricket-2",
    "title": "Python for Everyone: Hands-on Exercise",
    "type": "exercise",
    "topicName": "Python for Everyone",
    "estimatedMinutes": 55,
    "xpReward": 100,
    "generated": True,
    "sections": [
        {
            "type": "heading",
            "content": "What You'll Build",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "You will build a command-line cricket scorecard tracker in pure Python. The app lets you "
                "create a match between two teams, record batting entries (batsman, runs, balls faced, "
                "fours, sixes, and how they were dismissed) and bowling figures (bowler, overs, maidens, "
                "runs conceded, wickets). It then calculates real cricket statistics such as strike rate, "
                "economy rate, and run rate, and persists everything to a JSON file so you can resume a "
                "match later. By the end you will have a working tool that turns raw deliveries into a "
                "neatly formatted scorecard, the perfect project for a cricket fan learning Python through "
                "a domain they already love."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Prerequisites",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "key_points",
            "content": "",
            "language": "",
            "level": 2,
            "items": [
                "Python 3.8 or newer installed (the project uses dataclasses and f-strings).",
                "Comfort with built-in collections, especially dictionaries and lists for holding batting and bowling rows.",
                "A basic grasp of object-oriented thinking, since each scorecard row maps to a class.",
                "pip available for installing optional tooling, though this project needs no external dependencies.",
                "A terminal where you can run python3 and create directories."
            ],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Setup & Project Structure",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "The layout is deliberately minimal so you can focus on the cricket logic rather than "
                "packaging. A single scorecard.py file holds the data models, calculations, and the "
                "command-line interface. A data/ directory stores one JSON file per match, named after the "
                "two teams, acting as your lightweight database. There are no external dependencies at all, "
                "everything uses Python's standard library: dataclasses, json, and argparse."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "mkdir cricket_scorecard && cd cricket_scorecard\n"
                "mkdir data\n"
                "touch scorecard.py\n\n"
                "# Resulting tree structure:\n"
                "# cricket_scorecard/\n"
                "# |-- scorecard.py      # data models, logic, and CLI\n"
                "# |-- data/             # one JSON file per match\n"
                "#     |-- india_vs_australia.json"
            ),
            "language": "bash",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Step 1 — Foundation: Data Models",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "We model each row of a scorecard with a dataclass. A BattingEntry is exactly one batting "
                "line, and a BowlingEntry is exactly one bowling line, just like printed rows on a real "
                "scorecard. The Innings dataclass is the container that holds the two teams plus lists of "
                "batting and bowling entries, and knows how to serialise itself to JSON and load back. "
                "Think of the dataclass as a single scorecard row: it auto-generates the constructor and "
                "repr so you write almost no boilerplate."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "from __future__ import annotations\n"
                "import json\n"
                "import os\n"
                "from dataclasses import dataclass, field, asdict\n"
                "from typing import List\n\n\n"
                "@dataclass\n"
                "class BattingEntry:\n"
                "    batsman: str\n"
                "    runs: int = 0\n"
                "    balls: int = 0\n"
                "    fours: int = 0\n"
                "    sixes: int = 0\n"
                "    dismissal: str = \"not out\"\n"
                "    is_out: bool = False\n\n\n"
                "@dataclass\n"
                "class BowlingEntry:\n"
                "    bowler: str\n"
                "    overs: float = 0.0\n"
                "    maidens: int = 0\n"
                "    runs_conceded: int = 0\n"
                "    wickets: int = 0\n\n\n"
                "@dataclass\n"
                "class Innings:\n"
                "    team1: str\n"
                "    team2: str\n"
                "    batting: List[BattingEntry] = field(default_factory=list)\n"
                "    bowling: List[BowlingEntry] = field(default_factory=list)\n\n"
                "    def save(self, path: str) -> None:\n"
                "        with open(path, \"w\") as f:\n"
                "            json.dump(asdict(self), f, indent=2)\n\n"
                "    @classmethod\n"
                "    def load(cls, path: str) -> \"Innings\":\n"
                "        with open(path) as f:\n"
                "            data = json.load(f)\n"
                "        innings = cls(team1=data[\"team1\"], team2=data[\"team2\"])\n"
                "        innings.batting = [BattingEntry(**b) for b in data[\"batting\"]]\n"
                "        innings.bowling = [BowlingEntry(**b) for b in data[\"bowling\"]]\n"
                "        return innings"
            ),
            "language": "python",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Step 2 — Core Logic: Calculations & Operations",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "Now we add the cricket maths. Strike rate is runs divided by balls faced times 100. "
                "Economy rate is runs conceded divided by overs bowled. Run rate is total team runs divided "
                "by overs bowled. We also add helper operations: add_batsman and add_bowler append new rows, "
                "get_total_runs and get_total_wickets aggregate the innings, and format_scorecard renders "
                "everything into a readable block of text, the way a broadcast scorecard would look."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "    def add_batsman(self, entry: BattingEntry) -> None:\n"
                "        self.batting.append(entry)\n\n"
                "    def add_bowler(self, entry: BowlingEntry) -> None:\n"
                "        self.bowling.append(entry)\n\n"
                "    def get_total_runs(self) -> int:\n"
                "        return sum(b.runs for b in self.batting)\n\n"
                "    def get_total_wickets(self) -> int:\n"
                "        return sum(1 for b in self.batting if b.is_out)\n\n"
                "    @staticmethod\n"
                "    def strike_rate(entry: BattingEntry) -> float:\n"
                "        return round(entry.runs / entry.balls * 100, 2) if entry.balls else 0.0\n\n"
                "    @staticmethod\n"
                "    def economy(entry: BowlingEntry) -> float:\n"
                "        return round(entry.runs_conceded / entry.overs, 2) if entry.overs else 0.0\n\n"
                "    def get_run_rate(self, overs_bowled: float) -> float:\n"
                "        return round(self.get_total_runs() / overs_bowled, 2) if overs_bowled else 0.0\n\n"
                "    def format_scorecard(self) -> str:\n"
                "        lines = [f\"{self.team1} vs {self.team2}\", \"=\" * 40, \"BATTING\"]\n"
                "        lines.append(f\"{'Batsman':20}{'R':>4}{'B':>4}{'4s':>4}{'6s':>4}{'SR':>8}\")\n"
                "        for b in self.batting:\n"
                "            lines.append(\n"
                "                f\"{b.batsman:20}{b.runs:>4}{b.balls:>4}\"\n"
                "                f\"{b.fours:>4}{b.sixes:>4}{self.strike_rate(b):>8}\"\n"
                "            )\n"
                "        total = self.get_total_runs()\n"
                "        wkts = self.get_total_wickets()\n"
                "        lines.append(f\"TOTAL: {total}/{wkts}\")\n"
                "        lines.append(\"\")\n"
                "        lines.append(\"BOWLING\")\n"
                "        lines.append(f\"{'Bowler':20}{'O':>5}{'M':>4}{'R':>4}{'W':>4}{'Econ':>8}\")\n"
                "        for w in self.bowling:\n"
                "            lines.append(\n"
                "                f\"{w.bowler:20}{w.overs:>5}{w.maidens:>4}\"\n"
                "                f\"{w.runs_conceded:>4}{w.wickets:>4}{self.economy(w):>8}\"\n"
                "            )\n"
                "        return \"\\n\".join(lines)"
            ),
            "language": "python",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Step 3 — Integration: CLI Interface",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "The command-line interface uses argparse subcommands so each action reads like a cricket "
                "instruction. new-match creates a fresh match file from --team1 and --team2, add-bat "
                "records a batting entry, add-bowl records bowling figures, and show prints the formatted "
                "scorecard. We use the match name (derived from the two teams, lowercased and joined) as "
                "the JSON file identifier so every command knows which match file to read and write."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "import argparse\n\n"
                "DATA_DIR = \"data\"\n\n\n"
                "def match_path(match: str) -> str:\n"
                "    return os.path.join(DATA_DIR, f\"{match}.json\")\n\n\n"
                "def main() -> None:\n"
                "    parser = argparse.ArgumentParser(description=\"Cricket scorecard tracker\")\n"
                "    sub = parser.add_subparsers(dest=\"command\", required=True)\n\n"
                "    p_new = sub.add_parser(\"new-match\")\n"
                "    p_new.add_argument(\"--team1\", required=True)\n"
                "    p_new.add_argument(\"--team2\", required=True)\n\n"
                "    p_bat = sub.add_parser(\"add-bat\")\n"
                "    p_bat.add_argument(\"--match\", required=True)\n"
                "    p_bat.add_argument(\"--batsman\", required=True)\n"
                "    p_bat.add_argument(\"--runs\", type=int, default=0)\n"
                "    p_bat.add_argument(\"--balls\", type=int, default=0)\n"
                "    p_bat.add_argument(\"--fours\", type=int, default=0)\n"
                "    p_bat.add_argument(\"--sixes\", type=int, default=0)\n"
                "    p_bat.add_argument(\"--dismissed\", default=\"not out\")\n\n"
                "    p_bowl = sub.add_parser(\"add-bowl\")\n"
                "    p_bowl.add_argument(\"--match\", required=True)\n"
                "    p_bowl.add_argument(\"--bowler\", required=True)\n"
                "    p_bowl.add_argument(\"--overs\", type=float, default=0.0)\n"
                "    p_bowl.add_argument(\"--maidens\", type=int, default=0)\n"
                "    p_bowl.add_argument(\"--runs\", type=int, default=0)\n"
                "    p_bowl.add_argument(\"--wickets\", type=int, default=0)\n\n"
                "    p_show = sub.add_parser(\"show\")\n"
                "    p_show.add_argument(\"--match\", required=True)\n\n"
                "    args = parser.parse_args()\n"
                "    os.makedirs(DATA_DIR, exist_ok=True)\n\n"
                "    if args.command == \"new-match\":\n"
                "        match = f\"{args.team1.lower()}_vs_{args.team2.lower()}\"\n"
                "        innings = Innings(team1=args.team1, team2=args.team2)\n"
                "        innings.save(match_path(match))\n"
                "        print(f\"Created match: {match}\")\n\n"
                "    elif args.command == \"add-bat\":\n"
                "        innings = Innings.load(match_path(args.match))\n"
                "        innings.add_batsman(BattingEntry(\n"
                "            batsman=args.batsman, runs=args.runs, balls=args.balls,\n"
                "            fours=args.fours, sixes=args.sixes,\n"
                "            dismissal=args.dismissed,\n"
                "            is_out=(args.dismissed != \"not out\"),\n"
                "        ))\n"
                "        innings.save(match_path(args.match))\n"
                "        print(f\"Recorded {args.batsman}: {args.runs} ({args.balls})\")\n\n"
                "    elif args.command == \"add-bowl\":\n"
                "        innings = Innings.load(match_path(args.match))\n"
                "        innings.add_bowler(BowlingEntry(\n"
                "            bowler=args.bowler, overs=args.overs, maidens=args.maidens,\n"
                "            runs_conceded=args.runs, wickets=args.wickets,\n"
                "        ))\n"
                "        innings.save(match_path(args.match))\n"
                "        print(f\"Recorded {args.bowler}: {args.wickets}/{args.runs}\")\n\n"
                "    elif args.command == \"show\":\n"
                "        innings = Innings.load(match_path(args.match))\n"
                "        print(innings.format_scorecard())\n\n\n"
                "if __name__ == \"__main__\":\n"
                "    main()"
            ),
            "language": "python",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Step 4 — Testing & Verification",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "Let's drive the tool through a realistic scenario. First create an India versus Australia "
                "match, then record India's top-order batting starting with Rohit Sharma, then enter Jasprit "
                "Bumrah's bowling figures, and finally display the full scorecard to confirm the strike "
                "rates and economy rates were computed correctly."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "python scorecard.py new-match --team1 India --team2 Australia\n"
                "python scorecard.py add-bat --match india_vs_australia \\\n"
                "    --batsman \"Rohit Sharma\" --runs 67 --balls 45 --fours 8 --sixes 2\n"
                "python scorecard.py add-bat --match india_vs_australia \\\n"
                "    --batsman \"Shubman Gill\" --runs 31 --balls 28 --fours 4 --sixes 0 \\\n"
                "    --dismissed \"c Smith b Starc\"\n"
                "python scorecard.py add-bowl --match india_vs_australia \\\n"
                "    --bowler \"Jasprit Bumrah\" --overs 4 --maidens 1 --runs 23 --wickets 2\n"
                "python scorecard.py show --match india_vs_australia\n\n"
                "# Expected output:\n"
                "# India vs Australia\n"
                "# ========================================\n"
                "# BATTING\n"
                "# Batsman                R   B  4s  6s      SR\n"
                "# Rohit Sharma          67  45   8   2  148.89\n"
                "# Shubman Gill          31  28   4   0   110.71\n"
                "# TOTAL: 98/1\n"
                "#\n"
                "# BOWLING\n"
                "# Bowler                  O   M   R   W    Econ\n"
                "# Jasprit Bumrah        4.0   1  23   2    5.75"
            ),
            "language": "bash",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "warning_box",
            "content": (
                "Warning: If a match JSON file is empty or partially written (for example the process was "
                "killed mid-save during a power cut at the ground), json.load will raise "
                "json.JSONDecodeError and crash every subsequent command. Always check the file exists with "
                "os.path.exists before loading, and wrap json.load in a try/except json.JSONDecodeError so "
                "you can print a friendly 'match file is corrupted or empty, please recreate it' message "
                "instead of dumping a stack trace at the scorer."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "info_box",
            "content": (
                "Extension Challenge: Level up your tracker with one of these. 1) Add partnership tracking "
                "that records runs added between each pair of batsmen at the crease and flags century "
                "stands. 2) Render a wagon wheel of a batsman's scoring shots using simple ASCII art around "
                "a circle. 3) Integrate with a live ESPNcricinfo-style API to auto-populate ball-by-ball "
                "data for a real match instead of typing entries by hand, turning your CLI into a live "
                "score viewer."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "key_points",
            "content": "",
            "language": "",
            "level": 2,
            "items": [
                "Dataclasses (BattingEntry, BowlingEntry, Innings) give you free constructors and repr, mapping cleanly onto scorecard rows.",
                "asdict plus json.dump serialises nested dataclasses to disk, and **kwargs unpacking rebuilds them on load.",
                "argparse subparsers model distinct CLI verbs (new-match, add-bat, add-bowl, show) with their own validated arguments.",
                "f-string format specifiers like {b.runs:>4} produce aligned, broadcast-style columns in the scorecard.",
                "Cricket statistics are simple ratios: strike rate is runs/balls*100, economy is runs/overs, run rate is total runs/overs.",
                "Guarding file reads against missing or corrupt JSON keeps the tool robust during real match-day use."
            ],
            "answer": -1,
            "explanation": ""
        }
    ]
}

lesson3 = {
    "lessonId": "cricket-3",
    "title": "React 19 & Ecosystem: Quiz",
    "type": "quiz",
    "topicName": "React 19 & Ecosystem",
    "estimatedMinutes": 20,
    "xpReward": 50,
    "generated": True,
    "sections": [
        {
            "type": "heading",
            "content": "Knowledge Check — React 19 & Ecosystem",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "This quiz tests your understanding of React hooks, rendering behaviour, state management, "
                "and performance optimisation. The applied questions are framed around building a live "
                "cricket scoring dashboard that streams real-time ball-by-ball updates, so you will reason "
                "about re-renders, memoisation, effects, and server components exactly as you would when "
                "shipping a production scoreboard during an IPL match."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "quiz",
            "content": "What is the primary purpose of React's useCallback hook?",
            "language": "",
            "level": 2,
            "items": [
                "It memoises the result of an expensive calculation between renders",
                "It returns a memoised function reference that stays stable across renders to prevent unnecessary child re-renders",
                "It schedules a side effect to run after the component commits to the DOM",
                "It forces a component to re-render whenever the function body changes"
            ],
            "answer": 1,
            "explanation": (
                "useCallback returns a memoised version of a callback whose identity only changes when its "
                "dependencies change. This matters because passing a fresh function each render to a "
                "React.memo child (like a WicketAlert button) would break the child's prop equality and "
                "force a re-render. useMemo (A) memoises values, useEffect (C) runs side effects, so (B) is "
                "correct: a stable function reference."
            )
        },
        {
            "type": "quiz",
            "content": "In React 18+, what happens when you call multiple setState() calls inside a native event handler?",
            "language": "",
            "level": 2,
            "items": [
                "Each setState triggers its own immediate synchronous re-render",
                "Only the last setState call takes effect and the others are discarded",
                "They are automatically batched into a single re-render for better performance",
                "React throws an error because multiple updates are not allowed per handler"
            ],
            "answer": 2,
            "explanation": (
                "React 18 introduced automatic batching everywhere, including native event handlers, "
                "timeouts, and promises, not just React synthetic events. Multiple state updates within the "
                "same tick are grouped so the component re-renders once with all updates applied. Updating "
                "score, over, and wicket count together in a WebSocket handler therefore yields one render, "
                "not three. The other options describe pre-18 or incorrect behaviour."
            )
        },
        {
            "type": "quiz",
            "content": (
                "Your live cricket scoreboard shows ball-by-ball commentary. You wrap the CommentaryFeed "
                "component in React.memo. When does it still re-render?"
            ),
            "language": "",
            "level": 2,
            "items": [
                "Never, React.memo guarantees the component will not re-render again",
                "Only when its parent re-renders, regardless of props",
                "When a prop changes by reference, for example a new array or object or function is passed even if its contents are identical",
                "Only when its internal state changes, never due to props"
            ],
            "answer": 2,
            "explanation": (
                "React.memo does a shallow comparison of props. Primitives compare by value, but objects, "
                "arrays, and functions compare by reference. If the parent passes a freshly created "
                "commentary={[...]} array or an inline onClick each render, the reference differs and the "
                "memoised CommentaryFeed still re-renders. Stabilise such props with useMemo/useCallback to "
                "make memoisation effective."
            )
        },
        {
            "type": "quiz",
            "content": (
                "In your cricket app, you use useEffect to subscribe to a WebSocket for live score updates. "
                "When exactly does the cleanup function run?"
            ),
            "language": "",
            "level": 2,
            "items": [
                "Only once, when the component is first mounted",
                "Before every re-run of the effect (when dependencies change) and once when the component unmounts",
                "Immediately after the effect runs, in the same render",
                "Only when the browser tab is closed"
            ],
            "answer": 1,
            "explanation": (
                "The cleanup function returned from useEffect runs before the effect executes again due to a "
                "dependency change, and a final time on unmount. For a WebSocket this means React closes the "
                "old socket before opening a new one when the matchId dependency changes, and closes it when "
                "the dashboard unmounts, preventing duplicate subscriptions and memory leaks during a long "
                "innings."
            )
        },
        {
            "type": "quiz",
            "content": (
                "Your cricket dashboard has 11 batsman cards, each showing live strike rate. Every ball "
                "delivery, ALL 11 cards re-render even for unchanged batsmen. What is the correct fix?"
            ),
            "language": "",
            "level": 2,
            "items": [
                "Wrap each BatsmanCard in React.memo and pass stable, primitive props so unchanged cards skip re-rendering",
                "Wrap the whole list in useCallback to memoise the rendering function",
                "Use useMemo to cache the strike rate number inside each card",
                "Virtualise the list with react-window so only visible cards render"
            ],
            "answer": 0,
            "explanation": (
                "Only the batsman who faced the ball changed, yet all cards re-render because the parent "
                "re-renders. Wrapping BatsmanCard in React.memo with stable primitive props (runs, balls) "
                "lets React skip cards whose props are unchanged. useCallback (B) memoises functions not "
                "components, useMemo (C) caches a value but still re-renders the card, and virtualisation "
                "(D) addresses long lists, not selective updates of only 11 items."
            )
        },
        {
            "type": "quiz",
            "content": (
                "You're building a cricket fantasy team app used by 500k users. Shared state: current "
                "match, user's squad, global leaderboard. Which state management fits best?"
            ),
            "language": "",
            "level": 2,
            "items": [
                "Put everything in a single React Context provider at the app root",
                "Use server state tools (React Query/TanStack Query or RSC) for match and leaderboard data, and a light client store (Zustand) or Context for the user's local squad selections",
                "Use Redux for absolutely all state including ephemeral UI toggles",
                "Lift all state to the top component and prop-drill it everywhere"
            ],
            "answer": 1,
            "explanation": (
                "Match scores and the global leaderboard are server state, frequently changing remote data "
                "best handled by a caching/fetching library (React Query) or server components, which gives "
                "you caching, revalidation, and background refetch. The user's in-progress squad is local "
                "client state suited to Zustand or Context. A single Context (A) causes app-wide re-renders, "
                "Redux-for-everything (C) is overkill, and prop drilling (D) does not scale."
            )
        },
        {
            "type": "quiz",
            "content": (
                "In your run-chase calculator component, a useEffect has [target, currentScore] as deps. "
                "Inside it, you reference an `overs` variable from the outer component scope that's NOT in "
                "the deps array. What happens?"
            ),
            "language": "",
            "level": 2,
            "items": [
                "React automatically adds overs to the dependency array at runtime",
                "The effect captures a stale closure: it keeps seeing the value of overs from the render when the effect last ran, leading to incorrect required run rate calculations",
                "The component crashes immediately with a missing dependency error",
                "overs is always read fresh because closures re-read outer variables live"
            ],
            "answer": 1,
            "explanation": (
                "Effects close over the variables from the render in which they were created. Because overs "
                "is omitted from the deps, the effect does not re-run when overs changes, so it keeps using "
                "the stale value captured last time target or currentScore changed. Your required-run-rate "
                "math will silently use an outdated overs figure. The lint rule warns but does not crash, "
                "and the fix is to include overs in the dependency array."
            )
        },
        {
            "type": "quiz",
            "content": (
                "You want to show live match commentary in a Server Component but allow users to click "
                "'Add to Favourites' on each comment. What is the correct Next.js App Router approach?"
            ),
            "language": "",
            "level": 2,
            "items": [
                "Add an onClick handler directly in the Server Component",
                "Convert the entire page to a Client Component with 'use client' at the top",
                "Keep the commentary list as a Server Component and extract the interactive 'Add to Favourites' button into a small Client Component (marked 'use client') passed as a child",
                "Use getServerSideProps to handle the click on the server"
            ],
            "answer": 2,
            "explanation": (
                "Server Components cannot use event handlers or hooks, so the interactive button must be a "
                "Client Component marked 'use client'. The best pattern keeps the heavy, data-fetching "
                "commentary list on the server and isolates only the small FavouriteButton as a client "
                "island, minimising JavaScript sent to the browser. Marking the whole page client (B) "
                "sacrifices server rendering benefits, and getServerSideProps (D) is Pages Router, not App "
                "Router."
            )
        },
        {
            "type": "key_points",
            "content": "",
            "language": "",
            "level": 2,
            "items": [
                "useCallback memoises function references and useMemo memoises computed values, both to preserve prop equality for memoised children.",
                "React 18+ automatically batches state updates everywhere, so multiple setState calls in a WebSocket handler cause a single re-render.",
                "React.memo only skips re-renders when props are shallowly equal, so object, array, and function props must be reference-stable.",
                "useEffect cleanup runs before each re-run on dependency change and once on unmount, which is essential for closing live-score WebSockets.",
                "Match the tool to the data: server state libraries for remote match/leaderboard data, lightweight client stores for local UI like squad picks.",
                "Omitting a dependency causes stale closures, and interactive UI in the App Router belongs in small 'use client' islands within Server Components."
            ],
            "answer": -1,
            "explanation": ""
        }
    ]
}

lesson4 = {
    "lessonId": "cricket-4",
    "title": "System Design: Deep Dive & Advanced Patterns",
    "type": "reading",
    "topicName": "System Design",
    "estimatedMinutes": 35,
    "xpReward": 75,
    "generated": True,
    "sections": [
        {
            "type": "heading",
            "content": "Overview",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "ESPNcricinfo serves more than 50 million concurrent users during a marquee India versus "
                "Pakistan World Cup match, all refreshing scores every few seconds and expecting "
                "ball-by-ball updates within a heartbeat. How do you design a system that survives that "
                "kind of surge without buckling? This lesson works through the core distributed-systems "
                "principles, the CAP theorem, sharding, caching, and event-driven architecture, entirely "
                "through the lens of building a real-time cricket scoring platform. By treating every ball "
                "as an event flowing through queues, caches, and databases, you will see how abstract "
                "theory maps directly onto the very real engineering choices behind the scoreboards "
                "millions of fans stare at during a tense run chase."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Core Concepts",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "The CAP theorem states that during a network partition a distributed system can guarantee "
                "either Consistency or Availability, but not both. Map this to live cricket scores. A "
                "Consistency-first (CP) system ensures every fan worldwide sees the exact same score at the "
                "same instant, but if a network partition splits the cluster, the affected nodes must "
                "refuse requests rather than serve a possibly wrong score, meaning the scoreboard may go "
                "dark, reminiscent of Cricinfo buckling under load during the 2011 World Cup. An "
                "Availability-first (AP) system keeps the scoreboard responsive for everyone even during a "
                "partition, accepting that some users may briefly see a slightly stale score (say 247/4 "
                "while the truth is 251/4) until the system reconverges. Most live-score platforms lean AP "
                "for the public read path, fans tolerate a one-second-stale boundary far better than a "
                "blank screen, while keeping the authoritative scorer's write path strongly consistent."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "Mobile / Web Clients\n"
                "        |\n"
                "        v\n"
                "   [ CDN ]                         (AP: serves cached scoreboards, edge-close,\n"
                "        |                            stale-while-revalidate for availability)\n"
                "        v\n"
                "  [ API Gateway ]                  (auth, rate limiting, routing)\n"
                "        |\n"
                "        v\n"
                "  [ Score Update Service ]         (CP write path: the official scorer's\n"
                "        |                            ball entries are validated, ordered)\n"
                "        v\n"
                "  [ Message Queue: Kafka ]         (durable, ordered event log per match;\n"
                "        |                            decouples writers from readers)\n"
                "        |----------------------+\n"
                "        v                       v\n"
                "  [ Redis Cache ]          [ PostgreSQL ]\n"
                "  (AP: fast reads,         (CP: durable system of record,\n"
                "   pub/sub live push,       strongly consistent match history,\n"
                "   eventually consistent)   replicated with quorum writes)"
            ),
            "language": "bash",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "Each hop makes a deliberate CAP trade-off. The CDN and Redis cache prioritise availability "
                "and low latency on the read-heavy fan path, tolerating brief staleness. Kafka provides a "
                "durable, strictly ordered log so balls are never lost or reordered, the backbone of "
                "consistency. PostgreSQL is the consistent system of record for match history. Latency "
                "compounds across hops: a CDN edge hit returns in single-digit milliseconds, a Redis read "
                "in roughly one millisecond, while a cold PostgreSQL query plus Kafka round trip can add "
                "tens of milliseconds, which is exactly why hot scorecards are served from cache."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "How It Works Under the Hood",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "Suppose ten IPL matches run on the same evening of a packed schedule. Naively routing all "
                "of them to one database node creates a hotspot, so we shard match data across nodes using "
                "consistent hashing. Each database node is placed at multiple points on a hash ring, and "
                "each match id is hashed to a point; the match is owned by the first node encountered "
                "clockwise. Virtual nodes (multiple ring positions per physical node) smooth out the "
                "distribution so no single node is overloaded. A replication factor of three means each "
                "match also lands on the next two nodes for fault tolerance. The key benefit appears when "
                "you add a new DB node mid-tournament: only the keys in the arc immediately before the new "
                "node's positions migrate, rather than rehashing everything. This avoids a thundering herd "
                "of cache and data movement that a simple modulo-N scheme would trigger every time the "
                "cluster size changes."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "import hashlib\n"
                "import bisect\n\n\n"
                "class ConsistentHashRing:\n"
                "    def __init__(self, virtual_nodes: int = 100):\n"
                "        self.virtual_nodes = virtual_nodes\n"
                "        self._ring = {}            # hash -> node\n"
                "        self._sorted_hashes = []   # sorted ring positions\n\n"
                "    def _hash(self, key: str) -> int:\n"
                "        return int(hashlib.md5(key.encode()).hexdigest(), 16)\n\n"
                "    def add_node(self, node: str) -> None:\n"
                "        for i in range(self.virtual_nodes):\n"
                "            h = self._hash(f\"{node}#{i}\")\n"
                "            self._ring[h] = node\n"
                "            bisect.insort(self._sorted_hashes, h)\n\n"
                "    def remove_node(self, node: str) -> None:\n"
                "        for i in range(self.virtual_nodes):\n"
                "            h = self._hash(f\"{node}#{i}\")\n"
                "            self._ring.pop(h, None)\n"
                "            idx = bisect.bisect_left(self._sorted_hashes, h)\n"
                "            if idx < len(self._sorted_hashes) and self._sorted_hashes[idx] == h:\n"
                "                self._sorted_hashes.pop(idx)\n\n"
                "    def get_node(self, match_id: str) -> str:\n"
                "        if not self._ring:\n"
                "            raise RuntimeError(\"No DB nodes available\")\n"
                "        h = self._hash(match_id)\n"
                "        idx = bisect.bisect(self._sorted_hashes, h) % len(self._sorted_hashes)\n"
                "        return self._ring[self._sorted_hashes[idx]]\n\n\n"
                "if __name__ == \"__main__\":\n"
                "    ring = ConsistentHashRing()\n"
                "    for node in (\"db-node-1\", \"db-node-2\", \"db-node-3\"):\n"
                "        ring.add_node(node)\n\n"
                "    matches = [\"IPL-MI-vs-CSK\", \"IPL-RCB-vs-KKR\", \"IPL-SRH-vs-DC\",\n"
                "               \"IPL-GT-vs-RR\", \"IPL-PBKS-vs-LSG\"]\n"
                "    for m in matches:\n"
                "        print(f\"{m:20} -> {ring.get_node(m)}\")"
            ),
            "language": "python",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "info_box",
            "content": (
                "Pro Tip: Live cricket data is overwhelmingly read-heavy, score queries vastly outnumber "
                "score updates, since one scorer writes a ball but millions read it. Use a write-through "
                "cache: when the Score Update Service writes a new ball, it updates Redis and the database "
                "together, then issues a Redis PUBLISH on a per-match channel. Connected clients (or "
                "fan-out servers holding WebSockets) SUBSCRIBE to that channel and receive the new score "
                "pushed instantly, eliminating wasteful polling where millions of phones hammer your API "
                "every second asking 'any change yet?'"
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Common Patterns & Best Practices",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "CQRS (Command Query Responsibility Segregation) separates the write side from the read "
                "side. The official scorer issues commands that append to an event log, while millions of "
                "fans query a denormalised, display-optimised read view that is cheap to serve. Event "
                "Sourcing makes every ball an immutable event, BallDelivered, BoundaryHit, WicketFallen, "
                "and the scorecard becomes a projection computed by replaying those events. This gives you "
                "a perfect audit trail and the ability to rebuild any past state. A Circuit Breaker wraps "
                "calls to external dependencies such as a third-party Cricinfo data provider, tripping open "
                "after repeated failures so a flaky upstream does not cascade into your whole platform. "
                "Finally, a Saga coordinates the long-running match lifecycle as a sequence of state "
                "transitions, toss, then innings one, innings two, and result, with compensating actions if "
                "any step fails."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "import time\n\n\n"
                "class CircuitBreakerOpen(Exception):\n"
                "    pass\n\n\n"
                "class CircuitBreaker:\n"
                "    def __init__(self, failure_threshold: int = 3, reset_timeout: float = 10.0):\n"
                "        self.failure_threshold = failure_threshold\n"
                "        self.reset_timeout = reset_timeout\n"
                "        self.failure_count = 0\n"
                "        self.state = \"CLOSED\"          # CLOSED | OPEN | HALF_OPEN\n"
                "        self.opened_at = 0.0\n\n"
                "    def call(self, func, *args, **kwargs):\n"
                "        if self.state == \"OPEN\":\n"
                "            if time.time() - self.opened_at >= self.reset_timeout:\n"
                "                self.state = \"HALF_OPEN\"\n"
                "            else:\n"
                "                raise CircuitBreakerOpen(\"Cricinfo provider unavailable\")\n\n"
                "        try:\n"
                "            result = func(*args, **kwargs)\n"
                "        except Exception:\n"
                "            self._on_failure()\n"
                "            raise\n"
                "        else:\n"
                "            self._on_success()\n"
                "            return result\n\n"
                "    def _on_success(self) -> None:\n"
                "        self.failure_count = 0\n"
                "        self.state = \"CLOSED\"\n\n"
                "    def _on_failure(self) -> None:\n"
                "        self.failure_count += 1\n"
                "        if self.failure_count >= self.failure_threshold:\n"
                "            self.state = \"OPEN\"\n"
                "            self.opened_at = time.time()\n\n\n"
                "if __name__ == \"__main__\":\n"
                "    attempts = {\"n\": 0}\n\n"
                "    def fetch_live_score(match_id: str) -> str:\n"
                "        attempts[\"n\"] += 1\n"
                "        if attempts[\"n\"] <= 3:\n"
                "            raise ConnectionError(\"provider timeout\")\n"
                "        return f\"{match_id}: 187/4 (18.2 ov)\"\n\n"
                "    breaker = CircuitBreaker(failure_threshold=3, reset_timeout=0.5)\n"
                "    for _ in range(3):\n"
                "        try:\n"
                "            breaker.call(fetch_live_score, \"MI-vs-CSK\")\n"
                "        except Exception as e:\n"
                "            print(f\"{breaker.state}: {e}\")"
            ),
            "language": "python",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "warning_box",
            "content": (
                "Warning: Do not model cricket events as mutable database rows that you overwrite, for "
                "example UPDATE scorecard SET runs = runs + 4. If you do, you lose the audit trail and can "
                "never answer 'what did the score look like after over 12?' or correct a scorer's mistake "
                "cleanly. Instead, model each ball as an immutable, append-only event (BallDelivered with "
                "its runs, extras, and dismissal) and derive the live scorecard as a read projection by "
                "folding over those events. You gain replayability, easy debugging, and a complete history "
                "of the innings."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Real-World Application",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "These patterns are not academic. ESPNcricinfo serves cached, denormalised scorecards "
                "through CDNs for its read-heavy traffic. Disney+ Hotstar famously handled a record 25.3 "
                "million concurrent viewers during the IPL 2023 final, combining adaptive bitrate video "
                "streaming with a separate low-latency score-push pipeline so the on-screen scoreboard "
                "stays fresh even when the video buffers. Dream11 leans on Redis for real-time fantasy "
                "leaderboards, recomputing millions of users' points as wickets fall and boundaries fly. "
                "Each of them uses caching, event-driven fan-out, and careful CAP trade-offs exactly as "
                "described here."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "key_points",
            "content": "",
            "language": "",
            "level": 2,
            "items": [
                "CAP forces a partition-time choice between consistency and availability; public live-score read paths usually favour availability with brief staleness.",
                "Consistent hashing with virtual nodes distributes match data evenly and migrates only a small key range when nodes join or leave.",
                "Write-through caching plus Redis pub/sub pushes new scores to clients instantly, eliminating wasteful polling at massive read volumes.",
                "CQRS separates the scorer's write path from the fan's read path so each can be optimised and scaled independently.",
                "Event sourcing stores each ball as an immutable event, giving a full audit trail and letting the scorecard be a replayable projection.",
                "Circuit breakers and sagas keep the platform resilient: isolating flaky data providers and coordinating the toss-to-result match lifecycle safely."
            ],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "quiz",
            "content": (
                "During a critical India vs Australia Test match final day, your score database partition "
                "occurs. Your system is CP. What does this mean for users?"
            ),
            "language": "",
            "level": 2,
            "items": [
                "All users keep seeing scores, but some scores may be slightly stale until the partition heals",
                "The system sacrifices availability on the affected partition: requests that cannot guarantee a consistent score are rejected or error out until the partition heals",
                "The system silently shows different scores to different users with no errors",
                "The partition has no effect because CP systems never go down"
            ],
            "answer": 1,
            "explanation": (
                "A CP system chooses consistency over availability during a partition. Rather than risk "
                "returning a stale or divergent score, nodes that cannot reach quorum refuse to serve "
                "requests, so affected users see errors or timeouts until the partition heals. This "
                "guarantees no one ever sees a wrong score, but availability suffers. Option A describes AP "
                "behaviour, and C and D misstate how partitions and CP systems work."
            )
        },
        {
            "type": "quiz",
            "content": (
                "Your cricket live score API handles 2M req/s during peak. Scores update every 30 seconds. "
                "Which caching strategy gives lowest latency while keeping data fresh?"
            ),
            "language": "",
            "level": 2,
            "items": [
                "Cache-aside with a 30-minute TTL so most reads hit the database",
                "No caching, query PostgreSQL directly on every request for guaranteed freshness",
                "Write-through cache updated on each score change, fronted by a CDN with a short TTL (around 30s) plus push invalidation, so reads hit the edge and stay fresh",
                "A 1-hour CDN TTL with no invalidation to maximise cache hit ratio"
            ],
            "answer": 2,
            "explanation": (
                "Because updates occur roughly every 30 seconds and reads dominate at 2M req/s, you want "
                "reads served from a cache or CDN edge for the lowest latency, while keeping data fresh "
                "around the update cadence. A write-through cache refreshed on each score change, fronted "
                "by a CDN with a short TTL plus active invalidation, achieves both. Long TTLs (A, D) serve "
                "stale scores, and no caching (B) cannot survive 2M req/s."
            )
        }
    ]
}

lesson5 = {
    "lessonId": "cricket-5",
    "title": "AWS Solutions Architect: Capstone Mini Project",
    "type": "project",
    "topicName": "AWS Solutions Architect",
    "estimatedMinutes": 60,
    "xpReward": 150,
    "generated": True,
    "sections": [
        {
            "type": "heading",
            "content": "Project Overview",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "In this capstone you will build a production-grade serverless cricket scoring API on AWS, "
                "the kind of back-end that could power a club cricket tracker or a school tournament "
                "scorer. The API fetches live scores, stores match history, and sends push notifications "
                "the moment a wicket falls. Along the way you will use AWS Lambda for compute, API Gateway "
                "for HTTP routing, DynamoDB for storage, SNS for notifications, and S3 plus CloudFront to "
                "host a static scoreboard frontend, all secured with least-privilege IAM. The architecture "
                "scales automatically and a cricket fan who learns these services can run this for their "
                "local cricket club essentially for free within the AWS free tier, turning a weekend "
                "project into a real tool used every match day."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Learning Objectives",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "key_points",
            "content": "",
            "language": "",
            "level": 2,
            "items": [
                "Understand Lambda cold starts and apply warm-up strategies (provisioned concurrency, lightweight handlers) for fast scorecard responses.",
                "Apply DynamoDB single-table design, modelling ball-by-ball data and aggregated scorecards under one partition key.",
                "Configure API Gateway stages, throttling, and CORS so the scoreboard frontend can call the API safely.",
                "Implement the SNS fan-out pattern to broadcast wicket alerts to email and SMS subscribers simultaneously.",
                "Host a static scoreboard on S3 behind CloudFront with sensible cache-control headers.",
                "Write least-privilege IAM roles granting each Lambda only the DynamoDB actions it actually needs."
            ],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Technical Requirements",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "key_points",
            "content": "",
            "language": "",
            "level": 2,
            "items": [
                "POST /matches creates a new match with team names, venue, and format, returning a generated matchId.",
                "PUT /matches/{id}/ball records a single ball delivery (bowler, batsman, runs, extras, dismissal).",
                "GET /matches/{id}/scorecard returns the aggregated scorecard for a match.",
                "GET /matches returns recent matches ordered by start time using a GSI.",
                "An SNS notification fires whenever a wicket falls, with batsman, method, score, and over.",
                "DynamoDB TTL automatically expires old match data after 90 days to control storage cost.",
                "p99 latency for GET scorecard stays under 100ms via single-item reads and warm Lambdas.",
                "Daily cost stays under $1 for 10,000 matches/day, staying within or near the AWS free tier."
            ],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Architecture & Design",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "The heart of the design is a single DynamoDB table using composite keys. Each match's "
                "ball-by-ball events use PK=MATCH#{matchId} and SK=BALL#{over}#{ball}, while the aggregated "
                "view lives under the same PK with SK=SCORECARD, so one query by partition key retrieves "
                "the whole match cheaply. API Gateway routes each endpoint to a dedicated Lambda function, "
                "which reads or writes DynamoDB. An SNS topic named CricketEvents fans out wicket alerts to "
                "SMS and email subscribers. The static scoreboard (HTML and JS) sits in an S3 bucket served "
                "through a CloudFront distribution with cache-control headers for fast global delivery. "
                "Each Lambda assumes an IAM role scoped to the minimum DynamoDB actions it needs, such as "
                "ddb:GetItem and ddb:PutItem only. Serverless is the right fit here because cricket traffic "
                "is spiky: an obscure club game generates almost nothing, but an IPL-style fixture can jump "
                "from zero to two million requests in minutes, and Lambda plus DynamoDB on-demand absorb "
                "that surge automatically without pre-provisioning servers."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "AWSTemplateFormatVersion: '2010-09-09'\n"
                "Transform: AWS::Serverless-2016-10-31\n"
                "Description: Serverless live cricket score API\n\n"
                "Globals:\n"
                "  Function:\n"
                "    Runtime: python3.12\n"
                "    Timeout: 10\n"
                "    MemorySize: 256\n"
                "    Environment:\n"
                "      Variables:\n"
                "        TABLE_NAME: !Ref CricketTable\n"
                "        EVENTS_TOPIC: !Ref CricketEventsTopic\n\n"
                "Resources:\n\n"
                "  CricketTable:\n"
                "    Type: AWS::DynamoDB::Table\n"
                "    Properties:\n"
                "      TableName: CricketMatches\n"
                "      BillingMode: PAY_PER_REQUEST\n"
                "      AttributeDefinitions:\n"
                "        - AttributeName: PK\n"
                "          AttributeType: S\n"
                "        - AttributeName: SK\n"
                "          AttributeType: S\n"
                "        - AttributeName: GSI1PK\n"
                "          AttributeType: S\n"
                "        - AttributeName: startTime\n"
                "          AttributeType: S\n"
                "      KeySchema:\n"
                "        - AttributeName: PK\n"
                "          KeyType: HASH\n"
                "        - AttributeName: SK\n"
                "          KeyType: RANGE\n"
                "      GlobalSecondaryIndexes:\n"
                "        - IndexName: RecentMatches\n"
                "          KeySchema:\n"
                "            - AttributeName: GSI1PK\n"
                "              KeyType: HASH\n"
                "            - AttributeName: startTime\n"
                "              KeyType: RANGE\n"
                "          Projection:\n"
                "            ProjectionType: ALL\n"
                "      TimeToLiveSpecification:\n"
                "        AttributeName: ttl\n"
                "        Enabled: true\n\n"
                "  CricketEventsTopic:\n"
                "    Type: AWS::SNS::Topic\n"
                "    Properties:\n"
                "      TopicName: CricketEvents\n\n"
                "  WicketEmailSubscription:\n"
                "    Type: AWS::SNS::Subscription\n"
                "    Properties:\n"
                "      TopicArn: !Ref CricketEventsTopic\n"
                "      Protocol: email\n"
                "      Endpoint: club-captain@example.com\n\n"
                "  CricketApi:\n"
                "    Type: AWS::Serverless::Api\n"
                "    Properties:\n"
                "      StageName: prod\n"
                "      Cors:\n"
                "        AllowMethods: \"'GET,POST,PUT,OPTIONS'\"\n"
                "        AllowHeaders: \"'Content-Type'\"\n"
                "        AllowOrigin: \"'*'\"\n\n"
                "  CreateMatchFunction:\n"
                "    Type: AWS::Serverless::Function\n"
                "    Properties:\n"
                "      Handler: app.create_match\n"
                "      CodeUri: src/\n"
                "      Policies:\n"
                "        - DynamoDBWritePolicy:\n"
                "            TableName: !Ref CricketTable\n"
                "      Events:\n"
                "        Api:\n"
                "          Type: Api\n"
                "          Properties:\n"
                "            RestApiId: !Ref CricketApi\n"
                "            Path: /matches\n"
                "            Method: post\n\n"
                "  RecordBallFunction:\n"
                "    Type: AWS::Serverless::Function\n"
                "    Properties:\n"
                "      Handler: app.record_ball\n"
                "      CodeUri: src/\n"
                "      Policies:\n"
                "        - DynamoDBCrudPolicy:\n"
                "            TableName: !Ref CricketTable\n"
                "        - SNSPublishMessagePolicy:\n"
                "            TopicName: !GetAtt CricketEventsTopic.TopicName\n"
                "      Events:\n"
                "        Api:\n"
                "          Type: Api\n"
                "          Properties:\n"
                "            RestApiId: !Ref CricketApi\n"
                "            Path: /matches/{id}/ball\n"
                "            Method: put\n\n"
                "  GetScorecardFunction:\n"
                "    Type: AWS::Serverless::Function\n"
                "    Properties:\n"
                "      Handler: app.get_scorecard\n"
                "      CodeUri: src/\n"
                "      Policies:\n"
                "        - DynamoDBReadPolicy:\n"
                "            TableName: !Ref CricketTable\n"
                "      Events:\n"
                "        Api:\n"
                "          Type: Api\n"
                "          Properties:\n"
                "            RestApiId: !Ref CricketApi\n"
                "            Path: /matches/{id}/scorecard\n"
                "            Method: get\n\n"
                "  ListMatchesFunction:\n"
                "    Type: AWS::Serverless::Function\n"
                "    Properties:\n"
                "      Handler: app.list_matches\n"
                "      CodeUri: src/\n"
                "      Policies:\n"
                "        - DynamoDBReadPolicy:\n"
                "            TableName: !Ref CricketTable\n"
                "      Events:\n"
                "        Api:\n"
                "          Type: Api\n"
                "          Properties:\n"
                "            RestApiId: !Ref CricketApi\n"
                "            Path: /matches\n"
                "            Method: get\n\n"
                "  ScoreboardBucket:\n"
                "    Type: AWS::S3::Bucket\n"
                "    Properties:\n"
                "      BucketName: cricket-scoreboard-static\n\n"
                "  ScoreboardCDN:\n"
                "    Type: AWS::CloudFront::Distribution\n"
                "    Properties:\n"
                "      DistributionConfig:\n"
                "        Enabled: true\n"
                "        DefaultRootObject: index.html\n"
                "        Origins:\n"
                "          - Id: S3Origin\n"
                "            DomainName: !GetAtt ScoreboardBucket.RegionalDomainName\n"
                "            S3OriginConfig: {}\n"
                "        DefaultCacheBehavior:\n"
                "          TargetOriginId: S3Origin\n"
                "          ViewerProtocolPolicy: redirect-to-https\n"
                "          CachePolicyId: 658327ea-f89d-4fab-a63d-7e88639e58f6\n\n"
                "Outputs:\n"
                "  ApiUrl:\n"
                "    Value: !Sub \"https://${CricketApi}.execute-api.${AWS::Region}.amazonaws.com/prod\"\n"
                "  CdnUrl:\n"
                "    Value: !GetAtt ScoreboardCDN.DomainName"
            ),
            "language": "yaml",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Phase 1 — Core Implementation",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "Phase 1 builds the write path: creating a match and recording ball-by-ball data. Thanks to "
                "single-table design, each delivery is one PutItem under PK=MATCH#{matchId} with all its "
                "details (bowler, batsman, runs, extras, dismissal type). Rather than running a separate "
                "aggregation job, we keep a SCORECARD item updated atomically with each ball using a "
                "DynamoDB UpdateExpression, so the MVP can compute the live scorecard directly from that "
                "running aggregate. When a delivery is a wicket, we publish to SNS so subscribers are "
                "alerted immediately."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "import json\n"
                "import os\n"
                "import time\n"
                "import uuid\n"
                "import boto3\n\n"
                "dynamodb = boto3.resource(\"dynamodb\")\n"
                "sns = boto3.client(\"sns\")\n"
                "table = dynamodb.Table(os.environ[\"TABLE_NAME\"])\n"
                "EVENTS_TOPIC = os.environ.get(\"EVENTS_TOPIC\")\n\n"
                "TTL_SECONDS = 90 * 24 * 60 * 60  # 90 days\n\n\n"
                "def create_match(event, context):\n"
                "    body = json.loads(event[\"body\"])\n"
                "    match_id = str(uuid.uuid4())[:8]\n"
                "    start_time = body.get(\"startTime\", str(int(time.time())))\n"
                "    table.put_item(Item={\n"
                "        \"PK\": f\"MATCH#{match_id}\",\n"
                "        \"SK\": \"SCORECARD\",\n"
                "        \"GSI1PK\": \"MATCH\",\n"
                "        \"startTime\": start_time,\n"
                "        \"team1\": body[\"team1\"],\n"
                "        \"team2\": body[\"team2\"],\n"
                "        \"venue\": body.get(\"venue\", \"TBD\"),\n"
                "        \"format\": body.get(\"format\", \"T20\"),\n"
                "        \"totalRuns\": 0,\n"
                "        \"wickets\": 0,\n"
                "        \"balls\": 0,\n"
                "        \"ttl\": int(time.time()) + TTL_SECONDS,\n"
                "    })\n"
                "    return _response(201, {\"matchId\": match_id})\n\n\n"
                "def record_ball(event, context):\n"
                "    match_id = event[\"pathParameters\"][\"id\"]\n"
                "    b = json.loads(event[\"body\"])\n"
                "    # Example delivery: Shaheen Afridi to Rohit Sharma, over 14.3\n"
                "    over = int(b[\"over\"])          # 14\n"
                "    ball = int(b[\"ball\"])          # 3\n"
                "    runs = int(b.get(\"runs\", 0))\n"
                "    extras = int(b.get(\"extras\", 0))\n"
                "    is_wicket = bool(b.get(\"is_wicket\", False))\n\n"
                "    table.put_item(Item={\n"
                "        \"PK\": f\"MATCH#{match_id}\",\n"
                "        \"SK\": f\"BALL#{over:03d}#{ball}\",\n"
                "        \"bowler\": b[\"bowler\"],\n"
                "        \"batsman\": b[\"batsman\"],\n"
                "        \"runs\": runs,\n"
                "        \"extras\": extras,\n"
                "        \"dismissal\": b.get(\"dismissal\"),\n"
                "        \"is_wicket\": is_wicket,\n"
                "        \"ttl\": int(time.time()) + TTL_SECONDS,\n"
                "    })\n\n"
                "    # Atomically update the running scorecard aggregate.\n"
                "    table.update_item(\n"
                "        Key={\"PK\": f\"MATCH#{match_id}\", \"SK\": \"SCORECARD\"},\n"
                "        UpdateExpression=(\n"
                "            \"SET totalRuns = totalRuns + :r, balls = balls + :one \"\n"
                "            \"ADD wickets :w\"\n"
                "        ),\n"
                "        ExpressionAttributeValues={\n"
                "            \":r\": runs + extras,\n"
                "            \":one\": 1,\n"
                "            \":w\": 1 if is_wicket else 0,\n"
                "        },\n"
                "    )\n\n"
                "    if is_wicket and EVENTS_TOPIC:\n"
                "        sns.publish(\n"
                "            TopicArn=EVENTS_TOPIC,\n"
                "            Subject=\"Wicket!\",\n"
                "            Message=(\n"
                "                f\"WICKET! {b['batsman']} {b.get('dismissal','out')} \"\n"
                "                f\"b {b['bowler']} in over {over}.{ball}\"\n"
                "            ),\n"
                "        )\n"
                "    return _response(200, {\"recorded\": f\"{over}.{ball}\"})\n\n\n"
                "def _response(status, body):\n"
                "    return {\n"
                "        \"statusCode\": status,\n"
                "        \"headers\": {\"Content-Type\": \"application/json\",\n"
                "                     \"Access-Control-Allow-Origin\": \"*\"},\n"
                "        \"body\": json.dumps(body),\n"
                "    }"
            ),
            "language": "python",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Phase 2 — Feature Completion",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "Phase 2 completes the read side and notifications. The GET scorecard endpoint fetches the "
                "aggregated SCORECARD item and formats batting and bowling figures, computing run rate and, "
                "for a second innings, the required run rate. The match listing uses the RecentMatches GSI "
                "to return matches sorted by start time. We also enrich the SNS wicket message so "
                "subscribers receive the dismissed batsman, the method, the current score, and the over."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "from boto3.dynamodb.conditions import Key\n\n\n"
                "def get_scorecard(event, context):\n"
                "    match_id = event[\"pathParameters\"][\"id\"]\n"
                "    resp = table.get_item(\n"
                "        Key={\"PK\": f\"MATCH#{match_id}\", \"SK\": \"SCORECARD\"}\n"
                "    )\n"
                "    item = resp.get(\"Item\")\n"
                "    if not item:\n"
                "        return _response(404, {\"error\": \"match not found\"})\n\n"
                "    balls = int(item[\"balls\"])\n"
                "    overs = balls / 6 if balls else 0\n"
                "    run_rate = round(int(item[\"totalRuns\"]) / overs, 2) if overs else 0.0\n\n"
                "    scorecard = {\n"
                "        \"matchId\": match_id,\n"
                "        \"teams\": f\"{item['team1']} vs {item['team2']}\",\n"
                "        \"score\": f\"{item['totalRuns']}/{item['wickets']}\",\n"
                "        \"overs\": f\"{balls // 6}.{balls % 6}\",\n"
                "        \"runRate\": run_rate,\n"
                "    }\n\n"
                "    target = item.get(\"target\")\n"
                "    if target:\n"
                "        runs_needed = int(target) - int(item[\"totalRuns\"])\n"
                "        balls_left = (20 * 6) - balls  # T20 example\n"
                "        rrr = round(runs_needed / (balls_left / 6), 2) if balls_left else 0.0\n"
                "        scorecard[\"requiredRunRate\"] = rrr\n\n"
                "    return _response(200, scorecard)\n\n\n"
                "def list_matches(event, context):\n"
                "    resp = table.query(\n"
                "        IndexName=\"RecentMatches\",\n"
                "        KeyConditionExpression=Key(\"GSI1PK\").eq(\"MATCH\"),\n"
                "        ScanIndexForward=False,  # newest first\n"
                "        Limit=20,\n"
                "    )\n"
                "    matches = [\n"
                "        {\"matchId\": i[\"PK\"].split(\"#\")[1],\n"
                "         \"teams\": f\"{i['team1']} vs {i['team2']}\",\n"
                "         \"score\": f\"{i['totalRuns']}/{i['wickets']}\"}\n"
                "        for i in resp.get(\"Items\", [])\n"
                "    ]\n"
                "    return _response(200, {\"matches\": matches})\n\n\n"
                "def format_sns_wicket_message(batsman, method, bowler, score, over, ball):\n"
                "    return (\n"
                "        f\"WICKET! \\U0001F3CF\\n\"\n"
                "        f\"{batsman} {method} b {bowler}\\n\"\n"
                "        f\"Score: {score} after {over}.{ball} overs\"\n"
                "    )"
            ),
            "language": "python",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Phase 3 — Polish & Production Readiness",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "paragraph",
            "content": (
                "Phase 3 hardens the service. We validate input strictly (balls per over, runs in a legal "
                "range, valid dismissal types) and return precise HTTP errors: 404 when a match is not "
                "found and 422 for an invalid delivery. We emit structured logs keyed by match_id, over, "
                "and ball so CloudWatch Logs Insights queries are easy, publish custom CloudWatch metrics "
                "for API errors, and enable X-Ray tracing to pinpoint cold-start latency. A dead-letter "
                "queue captures failed SNS deliveries, and DynamoDB point-in-time recovery protects match "
                "history durability."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "code",
            "content": (
                "import json\n"
                "import logging\n"
                "from typing import Optional\n"
                "from pydantic import BaseModel, field_validator, ValidationError\n"
                "from aws_xray_sdk.core import xray_recorder\n\n"
                "logger = logging.getLogger()\n"
                "logger.setLevel(logging.INFO)\n\n"
                "VALID_DISMISSALS = {\n"
                "    \"bowled\", \"caught\", \"lbw\", \"run out\", \"stumped\",\n"
                "    \"hit wicket\", \"caught and bowled\",\n"
                "}\n\n\n"
                "class BallDelivery(BaseModel):\n"
                "    bowler: str\n"
                "    batsman: str\n"
                "    over: int\n"
                "    ball: int\n"
                "    runs: int = 0\n"
                "    extras: int = 0\n"
                "    is_wicket: bool = False\n"
                "    dismissal: Optional[str] = None\n\n"
                "    @field_validator(\"ball\")\n"
                "    @classmethod\n"
                "    def valid_ball(cls, v):\n"
                "        if not 1 <= v <= 6:\n"
                "            raise ValueError(\"ball must be between 1 and 6\")\n"
                "        return v\n\n"
                "    @field_validator(\"runs\")\n"
                "    @classmethod\n"
                "    def valid_runs(cls, v):\n"
                "        if not 0 <= v <= 6:\n"
                "            raise ValueError(\"runs off the bat must be 0-6\")\n"
                "        return v\n\n"
                "    @field_validator(\"dismissal\")\n"
                "    @classmethod\n"
                "    def valid_dismissal(cls, v):\n"
                "        if v is not None and v not in VALID_DISMISSALS:\n"
                "            raise ValueError(f\"unknown dismissal: {v}\")\n"
                "        return v\n\n\n"
                "def traced_record_ball(event, context):\n"
                "    match_id = event[\"pathParameters\"][\"id\"]\n"
                "    with xray_recorder.in_subsegment(\"validate_and_record\"):\n"
                "        try:\n"
                "            delivery = BallDelivery(**json.loads(event[\"body\"]))\n"
                "        except ValidationError as e:\n"
                "            logger.warning(json.dumps({\n"
                "                \"match_id\": match_id, \"error\": \"validation\",\n"
                "                \"detail\": e.errors(),\n"
                "            }))\n"
                "            return _response(422, {\"error\": \"invalid delivery\",\n"
                "                                   \"detail\": e.errors()})\n\n"
                "        logger.info(json.dumps({\n"
                "            \"match_id\": match_id,\n"
                "            \"over\": delivery.over,\n"
                "            \"ball\": delivery.ball,\n"
                "            \"event\": \"ball_recorded\",\n"
                "        }))\n"
                "        # ... persist via record_ball logic ...\n"
                "        return _response(200, {\"recorded\": f\"{delivery.over}.{delivery.ball}\"})"
            ),
            "language": "python",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "heading",
            "content": "Evaluation Rubric",
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "key_points",
            "content": "",
            "language": "",
            "level": 2,
            "items": [
                "DynamoDB design quality: correct single-table modelling with composite keys and a GSI for recent-match listing.",
                "IAM least privilege: each Lambda granted only the specific DynamoDB and SNS actions it requires, nothing broader.",
                "Error handling completeness: 404 for missing matches, 422 for invalid deliveries, and graceful handling of malformed input.",
                "SNS integration: wicket events reliably fan out to subscribers with a rich, informative message and a DLQ for failures.",
                "Cold start optimisation: lightweight handlers, right-sized memory, and provisioned concurrency where p99 latency matters.",
                "CloudWatch observability: structured logs keyed by match/over/ball, custom error metrics, and X-Ray tracing enabled.",
                "Cost estimation accuracy: a defensible calculation showing the design stays under $1/day for 10k matches within the free tier."
            ],
            "answer": -1,
            "explanation": ""
        },
        {
            "type": "info_box",
            "content": (
                "Extension Challenges: 1) Add a WebSocket API Gateway so the scoreboard receives live "
                "score pushes the instant a ball is recorded, eliminating client polling. 2) Use "
                "Lambda@Edge to localise displayed match start times at the CloudFront edge (IST for Indian "
                "fans, GMT for UK viewers) without round-tripping to origin. 3) Build a Dream11-style "
                "fantasy points calculator as a separate Lambda triggered by DynamoDB Streams, recomputing "
                "user fantasy scores automatically every time a new ball event lands in the table."
            ),
            "language": "",
            "level": 2,
            "items": [],
            "answer": -1,
            "explanation": ""
        }
    ]
}

lessons = [lesson1, lesson2, lesson3, lesson4, lesson5]

if __name__ == "__main__":
    import json
    print(json.dumps(lessons, indent=2)[:500])
