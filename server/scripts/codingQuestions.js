require("dotenv").config();

const mongoose = require("mongoose");
const CodingQuestion = require("../models/CodingQuestion");

const questions = [
  // =========================
  // EASY - 1
  // =========================
  {
    title: "Two Sum",
    slug: "two-sum-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Arrays",
    difficulty: "Easy",
    description:
      "Given an array of integers and a target, return the indices of two numbers whose sum equals the target.",
    inputFormat: "An integer array nums and an integer target.",
    outputFormat: "Return two zero-based indices.",
    constraints: ["2 <= nums.length <= 10000", "Exactly one valid answer exists."],
    examples: [
      {
        input: "nums=[2,7,11,15], target=9",
        output: "[0,1]",
        explanation: "2 + 7 = 9."
      }
    ],
    starterCode: {
      javascript:
        "function twoSum(nums, target) {\n  // Write your code here\n}",
      cpp:
        "vector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code here\n}",
      python:
        "def two_sum(nums, target):\n    # Write your code here\n    pass",
      java:
        "static int[] twoSum(int[] nums, int target) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "nums=[2,7,11,15], target=9",
        expectedOutput: "[0,1]",
        explanation: "2 + 7 = 9.",
        isHidden: false
      },
      {
        input: "nums=[3,2,4], target=6",
        expectedOutput: "[1,2]",
        explanation: "2 + 4 = 6.",
        isHidden: true
      }
    ],
    tags: ["arrays", "hash-map", "dsa"]
  },

  // =========================
  // EASY - 2
  // =========================
  {
    title: "Reverse a String",
    slug: "reverse-string-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Strings",
    difficulty: "Easy",
    description: "Return the reverse of the given string.",
    inputFormat: "A string.",
    outputFormat: "The reversed string.",
    constraints: ["1 <= s.length <= 10000"],
    examples: [
      {
        input: '"hello"',
        output: '"olleh"',
        explanation: "Characters are reversed."
      }
    ],
    starterCode: {
      javascript:
        "function reverseString(s) {\n  // Write your code here\n}",
      cpp:
        "string reverseString(string s) {\n    // Write your code here\n}",
      python:
        "def reverse_string(s):\n    # Write your code here\n    pass",
      java:
        "static String reverseString(String s) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: '"hello"',
        expectedOutput: '"olleh"',
        explanation: "Reverse of hello.",
        isHidden: false
      },
      {
        input: '"abcd"',
        expectedOutput: '"dcba"',
        explanation: "Reverse characters.",
        isHidden: true
      }
    ],
    tags: ["strings", "dsa"]
  },

  // =========================
  // EASY - 3
  // =========================
  {
    title: "Palindrome Check",
    slug: "palindrome-check-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Strings",
    difficulty: "Easy",
    description:
      "Check whether a string is a palindrome. Ignore spaces and letter casing.",
    inputFormat: "A string.",
    outputFormat: "true or false.",
    constraints: ["1 <= s.length <= 10000"],
    examples: [
      {
        input: '"Madam"',
        output: "true",
        explanation: "Ignoring case, Madam reads the same backward."
      }
    ],
    starterCode: {
      javascript:
        "function isPalindrome(s) {\n  // Write your code here\n}",
      cpp:
        "bool isPalindrome(string s) {\n    // Write your code here\n}",
      python:
        "def is_palindrome(s):\n    # Write your code here\n    pass",
      java:
        "static boolean isPalindrome(String s) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: '"Madam"',
        expectedOutput: "true",
        explanation: "Palindrome.",
        isHidden: false
      },
      {
        input: '"hello"',
        expectedOutput: "false",
        explanation: "Not a palindrome.",
        isHidden: true
      }
    ],
    tags: ["strings", "two-pointer", "dsa"]
  },

  // =========================
  // EASY - 4
  // =========================
  {
    title: "Find Maximum Number",
    slug: "find-maximum-number-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Arrays",
    difficulty: "Easy",
    description: "Find the largest number in an integer array.",
    inputFormat: "An integer array.",
    outputFormat: "The maximum value.",
    constraints: ["1 <= nums.length <= 10000"],
    examples: [
      {
        input: "[4,8,2,10,3]",
        output: "10",
        explanation: "10 is the largest value."
      }
    ],
    starterCode: {
      javascript:
        "function findMaximum(nums) {\n  // Write your code here\n}",
      cpp:
        "int findMaximum(vector<int>& nums) {\n    // Write your code here\n}",
      python:
        "def find_maximum(nums):\n    # Write your code here\n    pass",
      java:
        "static int findMaximum(int[] nums) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "[4,8,2,10,3]",
        expectedOutput: "10",
        explanation: "Maximum is 10.",
        isHidden: false
      },
      {
        input: "[-5,-2,-9]",
        expectedOutput: "-2",
        explanation: "Largest negative number is -2.",
        isHidden: true
      }
    ],
    tags: ["arrays", "dsa"]
  },

  // =========================
  // EASY - 5
  // =========================
  {
    title: "Count Vowels",
    slug: "count-vowels-practice",
    career: "Full Stack Developer",
    topic: "JavaScript",
    roadmapSkill: "JavaScript",
    difficulty: "Easy",
    description: "Count the number of vowels in a string.",
    inputFormat: "A string.",
    outputFormat: "Number of vowels.",
    constraints: ["1 <= s.length <= 10000"],
    examples: [
      {
        input: '"javascript"',
        output: "3",
        explanation: "a, a and i are vowels."
      }
    ],
    starterCode: {
      javascript:
        "function countVowels(s) {\n  // Write your code here\n}",
      cpp:
        "int countVowels(string s) {\n    // Write your code here\n}",
      python:
        "def count_vowels(s):\n    # Write your code here\n    pass",
      java:
        "static int countVowels(String s) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: '"javascript"',
        expectedOutput: "3",
        explanation: "Three vowels.",
        isHidden: false
      },
      {
        input: '"AEIOU"',
        expectedOutput: "5",
        explanation: "All characters are vowels.",
        isHidden: true
      }
    ],
    tags: ["strings", "javascript"]
  },

  // =========================
  // EASY - 6
  // =========================
  {
    title: "Move Zeroes",
    slug: "move-zeroes-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Arrays",
    difficulty: "Easy",
    description:
      "Move all zeroes to the end of the array while maintaining the relative order of non-zero values.",
    inputFormat: "An integer array.",
    outputFormat: "Modified array.",
    constraints: ["1 <= nums.length <= 10000"],
    examples: [
      {
        input: "[0,1,0,3,12]",
        output: "[1,3,12,0,0]",
        explanation: "Zeroes move to the end."
      }
    ],
    starterCode: {
      javascript:
        "function moveZeroes(nums) {\n  // Write your code here\n}",
      cpp:
        "void moveZeroes(vector<int>& nums) {\n    // Write your code here\n}",
      python:
        "def move_zeroes(nums):\n    # Write your code here\n    pass",
      java:
        "static void moveZeroes(int[] nums) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "[0,1,0,3,12]",
        expectedOutput: "[1,3,12,0,0]",
        explanation: "Zeroes moved.",
        isHidden: false
      },
      {
        input: "[0,0,1]",
        expectedOutput: "[1,0,0]",
        explanation: "Both zeroes move to the end.",
        isHidden: true
      }
    ],
    tags: ["arrays", "two-pointer"]
  },

  // =========================
  // EASY - 7
  // =========================
  {
    title: "Merge Two Sorted Arrays",
    slug: "merge-two-sorted-arrays-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Arrays",
    difficulty: "Easy",
    description: "Merge two sorted arrays into one sorted array.",
    inputFormat: "Two sorted integer arrays.",
    outputFormat: "One sorted array.",
    constraints: ["Both arrays are sorted ascending."],
    examples: [
      {
        input: "a=[1,3,5], b=[2,4,6]",
        output: "[1,2,3,4,5,6]",
        explanation: "Values are merged in sorted order."
      }
    ],
    starterCode: {
      javascript:
        "function mergeSorted(a, b) {\n  // Write your code here\n}",
      cpp:
        "vector<int> mergeSorted(vector<int>& a, vector<int>& b) {\n    // Write your code here\n}",
      python:
        "def merge_sorted(a, b):\n    # Write your code here\n    pass",
      java:
        "static int[] mergeSorted(int[] a, int[] b) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "a=[1,3,5], b=[2,4,6]",
        expectedOutput: "[1,2,3,4,5,6]",
        explanation: "Sorted merge.",
        isHidden: false
      },
      {
        input: "a=[1,1], b=[1,2]",
        expectedOutput: "[1,1,1,2]",
        explanation: "Duplicates are retained.",
        isHidden: true
      }
    ],
    tags: ["arrays", "two-pointer"]
  },

  // =========================
  // EASY - 8
  // =========================
  {
    title: "Find Missing Number",
    slug: "find-missing-number-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Arrays",
    difficulty: "Easy",
    description:
      "An array contains numbers from 0 to n with one number missing. Find the missing number.",
    inputFormat: "Integer array.",
    outputFormat: "Missing number.",
    constraints: ["1 <= n <= 100000"],
    examples: [
      {
        input: "[3,0,1]",
        output: "2",
        explanation: "2 is missing."
      }
    ],
    starterCode: {
      javascript:
        "function missingNumber(nums) {\n  // Write your code here\n}",
      cpp:
        "int missingNumber(vector<int>& nums) {\n    // Write your code here\n}",
      python:
        "def missing_number(nums):\n    # Write your code here\n    pass",
      java:
        "static int missingNumber(int[] nums) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "[3,0,1]",
        expectedOutput: "2",
        explanation: "2 is missing.",
        isHidden: false
      },
      {
        input: "[0,1]",
        expectedOutput: "2",
        explanation: "2 is missing.",
        isHidden: true
      }
    ],
    tags: ["arrays", "math", "xor"]
  },

  // =========================
  // EASY - 9
  // =========================
  {
    title: "First Non Repeating Character",
    slug: "first-non-repeating-character-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Hashing",
    difficulty: "Easy",
    description:
      "Find the first character that appears only once in a string.",
    inputFormat: "A string.",
    outputFormat: "The first unique character or -1.",
    constraints: ["1 <= s.length <= 10000"],
    examples: [
      {
        input: '"swiss"',
        output: '"w"',
        explanation: "w occurs only once."
      }
    ],
    starterCode: {
      javascript:
        "function firstUnique(s) {\n  // Write your code here\n}",
      cpp:
        "char firstUnique(string s) {\n    // Write your code here\n}",
      python:
        "def first_unique(s):\n    # Write your code here\n    pass",
      java:
        "static char firstUnique(String s) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: '"swiss"',
        expectedOutput: '"w"',
        explanation: "w is first unique.",
        isHidden: false
      },
      {
        input: '"aabb"',
        expectedOutput: "-1",
        explanation: "No unique character.",
        isHidden: true
      }
    ],
    tags: ["hashing", "strings"]
  },

  // =========================
  // EASY - 10
  // =========================
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Stack",
    difficulty: "Easy",
    description:
      "Check whether brackets (), {}, and [] are correctly balanced.",
    inputFormat: "A bracket string.",
    outputFormat: "true or false.",
    constraints: ["1 <= s.length <= 10000"],
    examples: [
      {
        input: '"()[]{}"',
        output: "true",
        explanation: "All brackets match correctly."
      }
    ],
    starterCode: {
      javascript:
        "function isValid(s) {\n  // Write your code here\n}",
      cpp:
        "bool isValid(string s) {\n    // Write your code here\n}",
      python:
        "def is_valid(s):\n    # Write your code here\n    pass",
      java:
        "static boolean isValid(String s) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: '"()[]{}"',
        expectedOutput: "true",
        explanation: "Valid brackets.",
        isHidden: false
      },
      {
        input: '"([)]"',
        expectedOutput: "false",
        explanation: "Wrong nesting.",
        isHidden: true
      }
    ],
    tags: ["stack", "dsa"]
  },

  // =========================
  // MEDIUM - 11
  // =========================
  {
    title: "Maximum Subarray Sum",
    slug: "maximum-subarray-sum-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Dynamic Programming",
    difficulty: "Medium",
    description:
      "Find the maximum sum of any contiguous subarray.",
    inputFormat: "Integer array.",
    outputFormat: "Maximum subarray sum.",
    constraints: ["1 <= nums.length <= 100000"],
    examples: [
      {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] gives sum 6."
      }
    ],
    starterCode: {
      javascript:
        "function maxSubArray(nums) {\n  // Write your code here\n}",
      cpp:
        "int maxSubArray(vector<int>& nums) {\n    // Write your code here\n}",
      python:
        "def max_sub_array(nums):\n    # Write your code here\n    pass",
      java:
        "static int maxSubArray(int[] nums) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "[-2,1,-3,4,-1,2,1,-5,4]",
        expectedOutput: "6",
        explanation: "Maximum is 6.",
        isHidden: false
      },
      {
        input: "[-5,-2,-8]",
        expectedOutput: "-2",
        explanation: "Largest single value.",
        isHidden: true
      }
    ],
    tags: ["arrays", "kadane", "dp"]
  },

  // =========================
  // MEDIUM - 12
  // =========================
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-unique-substring-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Sliding Window",
    difficulty: "Medium",
    description:
      "Find the length of the longest substring containing no repeated characters.",
    inputFormat: "A string.",
    outputFormat: "Maximum length.",
    constraints: ["0 <= s.length <= 10000"],
    examples: [
      {
        input: '"abcabcbb"',
        output: "3",
        explanation: "abc has length 3."
      }
    ],
    starterCode: {
      javascript:
        "function longestUnique(s) {\n  // Write your code here\n}",
      cpp:
        "int longestUnique(string s) {\n    // Write your code here\n}",
      python:
        "def longest_unique(s):\n    # Write your code here\n    pass",
      java:
        "static int longestUnique(String s) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: '"abcabcbb"',
        expectedOutput: "3",
        explanation: "abc.",
        isHidden: false
      },
      {
        input: '"bbbbb"',
        expectedOutput: "1",
        explanation: "Only one unique character.",
        isHidden: true
      }
    ],
    tags: ["sliding-window", "hashing", "strings"]
  },

  // =========================
  // MEDIUM - 13
  // =========================
  {
    title: "Merge Intervals",
    slug: "merge-intervals-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Sorting",
    difficulty: "Medium",
    description:
      "Merge all overlapping intervals.",
    inputFormat: "Array of [start,end] intervals.",
    outputFormat: "Merged intervals.",
    constraints: ["1 <= intervals.length <= 10000"],
    examples: [
      {
        input: "[[1,3],[2,6],[8,10],[9,12]]",
        output: "[[1,6],[8,12]]",
        explanation: "Overlapping intervals are merged."
      }
    ],
    starterCode: {
      javascript:
        "function mergeIntervals(intervals) {\n  // Write your code here\n}",
      cpp:
        "vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {\n    // Write your code here\n}",
      python:
        "def merge_intervals(intervals):\n    # Write your code here\n    pass",
      java:
        "static int[][] mergeIntervals(int[][] intervals) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "[[1,3],[2,6],[8,10],[9,12]]",
        expectedOutput: "[[1,6],[8,12]]",
        explanation: "Intervals merged.",
        isHidden: false
      },
      {
        input: "[[1,4],[4,5]]",
        expectedOutput: "[[1,5]]",
        explanation: "Touching intervals merge.",
        isHidden: true
      }
    ],
    tags: ["sorting", "intervals", "arrays"]
  },

  // =========================
  // MEDIUM - 14
  // =========================
  {
    title: "Product Except Self",
    slug: "product-except-self-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Arrays",
    difficulty: "Medium",
    description:
      "Return an array where each position contains the product of all other numbers.",
    inputFormat: "Integer array.",
    outputFormat: "Product array.",
    constraints: ["Division should not be used."],
    examples: [
      {
        input: "[1,2,3,4]",
        output: "[24,12,8,6]",
        explanation: "Each output excludes its own index."
      }
    ],
    starterCode: {
      javascript:
        "function productExceptSelf(nums) {\n  // Write your code here\n}",
      cpp:
        "vector<int> productExceptSelf(vector<int>& nums) {\n    // Write your code here\n}",
      python:
        "def product_except_self(nums):\n    # Write your code here\n    pass",
      java:
        "static int[] productExceptSelf(int[] nums) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "[1,2,3,4]",
        expectedOutput: "[24,12,8,6]",
        explanation: "Products calculated.",
        isHidden: false
      },
      {
        input: "[2,3,4]",
        expectedOutput: "[12,8,6]",
        explanation: "Product excluding each index.",
        isHidden: true
      }
    ],
    tags: ["arrays", "prefix", "suffix"]
  },

  // =========================
  // MEDIUM - 15
  // =========================
  {
    title: "Top K Frequent Elements",
    slug: "top-k-frequent-elements-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Hashing",
    difficulty: "Medium",
    description:
      "Return the k most frequent elements in an array.",
    inputFormat: "Integer array and k.",
    outputFormat: "Array of k most frequent elements.",
    constraints: ["1 <= k <= number of unique values"],
    examples: [
      {
        input: "nums=[1,1,1,2,2,3], k=2",
        output: "[1,2]",
        explanation: "1 and 2 are most frequent."
      }
    ],
    starterCode: {
      javascript:
        "function topKFrequent(nums, k) {\n  // Write your code here\n}",
      cpp:
        "vector<int> topKFrequent(vector<int>& nums, int k) {\n    // Write your code here\n}",
      python:
        "def top_k_frequent(nums, k):\n    # Write your code here\n    pass",
      java:
        "static int[] topKFrequent(int[] nums, int k) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "nums=[1,1,1,2,2,3], k=2",
        expectedOutput: "[1,2]",
        explanation: "Top two frequencies.",
        isHidden: false
      },
      {
        input: "nums=[1], k=1",
        expectedOutput: "[1]",
        explanation: "Only one unique value.",
        isHidden: true
      }
    ],
    tags: ["hashing", "heap", "arrays"]
  },

  // =========================
  // MEDIUM - 16
  // =========================
  {
    title: "Rotate Array",
    slug: "rotate-array-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Arrays",
    difficulty: "Medium",
    description:
      "Rotate an array to the right by k positions.",
    inputFormat: "Integer array and k.",
    outputFormat: "Rotated array.",
    constraints: ["1 <= nums.length <= 100000"],
    examples: [
      {
        input: "nums=[1,2,3,4,5], k=2",
        output: "[4,5,1,2,3]",
        explanation: "Last two values move to the front."
      }
    ],
    starterCode: {
      javascript:
        "function rotate(nums, k) {\n  // Write your code here\n}",
      cpp:
        "void rotate(vector<int>& nums, int k) {\n    // Write your code here\n}",
      python:
        "def rotate(nums, k):\n    # Write your code here\n    pass",
      java:
        "static void rotate(int[] nums, int k) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "nums=[1,2,3,4,5], k=2",
        expectedOutput: "[4,5,1,2,3]",
        explanation: "Rotated by two.",
        isHidden: false
      },
      {
        input: "nums=[1,2], k=5",
        expectedOutput: "[2,1]",
        explanation: "5 mod 2 = 1.",
        isHidden: true
      }
    ],
    tags: ["arrays", "rotation"]
  },

  // =========================
  // MEDIUM - 17
  // =========================
  {
    title: "Detect Linked List Cycle",
    slug: "detect-linked-list-cycle-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Linked List",
    difficulty: "Medium",
    description:
      "Determine whether a linked list contains a cycle.",
    inputFormat: "Linked list and cycle position.",
    outputFormat: "true or false.",
    constraints: ["0 <= number of nodes <= 10000"],
    examples: [
      {
        input: "values=[3,2,0,-4], pos=1",
        output: "true",
        explanation: "Tail points back to node 1."
      }
    ],
    starterCode: {
      javascript:
        "function hasCycle(head) {\n  // Write your code here\n}",
      cpp:
        "bool hasCycle(ListNode* head) {\n    // Write your code here\n}",
      python:
        "def has_cycle(head):\n    # Write your code here\n    pass",
      java:
        "static boolean hasCycle(ListNode head) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "values=[3,2,0,-4], pos=1",
        expectedOutput: "true",
        explanation: "Cycle exists.",
        isHidden: false
      },
      {
        input: "values=[1,2], pos=-1",
        expectedOutput: "false",
        explanation: "No cycle.",
        isHidden: true
      }
    ],
    tags: ["linked-list", "fast-slow-pointer"]
  },

  // =========================
  // MEDIUM - 18
  // =========================
  {
    title: "Binary Search in Rotated Array",
    slug: "binary-search-rotated-array-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Binary Search",
    difficulty: "Medium",
    description:
      "Search for a target in a rotated sorted array in O(log n) time.",
    inputFormat: "Rotated sorted array and target.",
    outputFormat: "Target index or -1.",
    constraints: ["All values are distinct."],
    examples: [
      {
        input: "nums=[4,5,6,7,0,1,2], target=0",
        output: "4",
        explanation: "0 is at index 4."
      }
    ],
    starterCode: {
      javascript:
        "function searchRotated(nums, target) {\n  // Write your code here\n}",
      cpp:
        "int searchRotated(vector<int>& nums, int target) {\n    // Write your code here\n}",
      python:
        "def search_rotated(nums, target):\n    # Write your code here\n    pass",
      java:
        "static int searchRotated(int[] nums, int target) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "nums=[4,5,6,7,0,1,2], target=0",
        expectedOutput: "4",
        explanation: "Target found.",
        isHidden: false
      },
      {
        input: "nums=[4,5,6,7,0,1,2], target=3",
        expectedOutput: "-1",
        explanation: "Target absent.",
        isHidden: true
      }
    ],
    tags: ["binary-search", "arrays"]
  },

  // =========================
  // MEDIUM - 19
  // =========================
  {
    title: "Level Order Tree Traversal",
    slug: "level-order-tree-traversal-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Trees",
    difficulty: "Medium",
    description:
      "Return the values of a binary tree level by level.",
    inputFormat: "Binary tree.",
    outputFormat: "Array of levels.",
    constraints: ["0 <= number of nodes <= 10000"],
    examples: [
      {
        input: "[3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
        explanation: "Nodes are grouped by depth."
      }
    ],
    starterCode: {
      javascript:
        "function levelOrder(root) {\n  // Write your code here\n}",
      cpp:
        "vector<vector<int>> levelOrder(TreeNode* root) {\n    // Write your code here\n}",
      python:
        "def level_order(root):\n    # Write your code here\n    pass",
      java:
        "static List<List<Integer>> levelOrder(TreeNode root) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "[3,9,20,null,null,15,7]",
        expectedOutput: "[[3],[9,20],[15,7]]",
        explanation: "Breadth-first traversal.",
        isHidden: false
      },
      {
        input: "[1]",
        expectedOutput: "[[1]]",
        explanation: "Single-node tree.",
        isHidden: true
      }
    ],
    tags: ["trees", "bfs", "queue"]
  },

  // =========================
  // MEDIUM - 20
  // =========================
  {
    title: "Number of Islands",
    slug: "number-of-islands-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Graphs",
    difficulty: "Medium",
    description:
      "Count the number of connected islands in a grid containing 1 for land and 0 for water.",
    inputFormat: "A 2D binary grid.",
    outputFormat: "Number of islands.",
    constraints: ["Grid contains only 0 and 1."],
    examples: [
      {
        input: "[[1,1,0],[0,1,0],[1,0,1]]",
        output: "3",
        explanation: "There are three connected land groups."
      }
    ],
    starterCode: {
      javascript:
        "function numIslands(grid) {\n  // Write your code here\n}",
      cpp:
        "int numIslands(vector<vector<char>>& grid) {\n    // Write your code here\n}",
      python:
        "def num_islands(grid):\n    # Write your code here\n    pass",
      java:
        "static int numIslands(char[][] grid) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "[[1,1,0],[0,1,0],[1,0,1]]",
        expectedOutput: "3",
        explanation: "Three islands.",
        isHidden: false
      },
      {
        input: "[[1,1],[1,1]]",
        expectedOutput: "1",
        explanation: "All land is connected.",
        isHidden: true
      }
    ],
    tags: ["graphs", "bfs", "dfs", "matrix"]
  },

  // =========================
  // HARD - 21
  // =========================
  {
    title: "Minimum Window Substring",
    slug: "minimum-window-substring-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Sliding Window",
    difficulty: "Hard",
    description:
      "Find the smallest substring of s that contains all characters of t.",
    inputFormat: "Two strings s and t.",
    outputFormat: "Minimum valid substring or empty string.",
    constraints: ["1 <= s.length,t.length <= 10000"],
    examples: [
      {
        input: 's="ADOBECODEBANC", t="ABC"',
        output: '"BANC"',
        explanation: "BANC is the smallest substring containing A, B and C."
      }
    ],
    starterCode: {
      javascript:
        "function minWindow(s, t) {\n  // Write your code here\n}",
      cpp:
        "string minWindow(string s, string t) {\n    // Write your code here\n}",
      python:
        "def min_window(s, t):\n    # Write your code here\n    pass",
      java:
        "static String minWindow(String s, String t) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: 's="ADOBECODEBANC", t="ABC"',
        expectedOutput: '"BANC"',
        explanation: "Minimum valid window.",
        isHidden: false
      },
      {
        input: 's="a", t="aa"',
        expectedOutput: '""',
        explanation: "Not enough characters.",
        isHidden: true
      }
    ],
    tags: ["sliding-window", "hashing", "strings"]
  },

  // =========================
  // HARD - 22
  // =========================
  {
    title: "Trapping Rain Water",
    slug: "trapping-rain-water-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Two Pointers",
    difficulty: "Hard",
    description:
      "Given heights of bars, calculate how much rain water can be trapped.",
    inputFormat: "Integer array of heights.",
    outputFormat: "Total trapped water.",
    constraints: ["0 <= height.length <= 10000"],
    examples: [
      {
        input: "[0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "Six units of water can be trapped."
      }
    ],
    starterCode: {
      javascript:
        "function trap(height) {\n  // Write your code here\n}",
      cpp:
        "int trap(vector<int>& height) {\n    // Write your code here\n}",
      python:
        "def trap(height):\n    # Write your code here\n    pass",
      java:
        "static int trap(int[] height) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "[0,1,0,2,1,0,1,3,2,1,2,1]",
        expectedOutput: "6",
        explanation: "Six units trapped.",
        isHidden: false
      },
      {
        input: "[4,2,0,3,2,5]",
        expectedOutput: "9",
        explanation: "Nine units trapped.",
        isHidden: true
      }
    ],
    tags: ["two-pointer", "arrays", "stack"]
  },

  // =========================
  // HARD - 23
  // =========================
  {
    title: "Coin Change",
    slug: "coin-change-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Dynamic Programming",
    difficulty: "Hard",
    description:
      "Return the minimum number of coins required to make a target amount.",
    inputFormat: "Coin array and amount.",
    outputFormat: "Minimum coins or -1.",
    constraints: ["1 <= coins.length <= 20", "0 <= amount <= 10000"],
    examples: [
      {
        input: "coins=[1,2,5], amount=11",
        output: "3",
        explanation: "5+5+1 uses three coins."
      }
    ],
    starterCode: {
      javascript:
        "function coinChange(coins, amount) {\n  // Write your code here\n}",
      cpp:
        "int coinChange(vector<int>& coins, int amount) {\n    // Write your code here\n}",
      python:
        "def coin_change(coins, amount):\n    # Write your code here\n    pass",
      java:
        "static int coinChange(int[] coins, int amount) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "coins=[1,2,5], amount=11",
        expectedOutput: "3",
        explanation: "5+5+1.",
        isHidden: false
      },
      {
        input: "coins=[2], amount=3",
        expectedOutput: "-1",
        explanation: "Impossible.",
        isHidden: true
      }
    ],
    tags: ["dynamic-programming", "dsa"]
  },

  // =========================
  // HARD - 24
  // =========================
  {
    title: "Word Ladder",
    slug: "word-ladder-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Graphs",
    difficulty: "Hard",
    description:
      "Find the shortest transformation sequence from beginWord to endWord by changing one character at a time. Every intermediate word must exist in the word list.",
    inputFormat: "beginWord, endWord and wordList.",
    outputFormat: "Length of shortest transformation sequence.",
    constraints: ["All words have the same length."],
    examples: [
      {
        input: 'begin="hit", end="cog", words=["hot","dot","dog","lot","log","cog"]',
        output: "5",
        explanation: "hit -> hot -> dot -> dog -> cog."
      }
    ],
    starterCode: {
      javascript:
        "function ladderLength(beginWord, endWord, wordList) {\n  // Write your code here\n}",
      cpp:
        "int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n    // Write your code here\n}",
      python:
        "def ladder_length(begin_word, end_word, word_list):\n    # Write your code here\n    pass",
      java:
        "static int ladderLength(String beginWord, String endWord, List<String> wordList) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: 'begin="hit", end="cog", words=["hot","dot","dog","lot","log","cog"]',
        expectedOutput: "5",
        explanation: "Shortest path has five words.",
        isHidden: false
      },
      {
        input: 'begin="hit", end="cog", words=["hot","dot","dog","lot","log"]',
        expectedOutput: "0",
        explanation: "End word is unavailable.",
        isHidden: true
      }
    ],
    tags: ["graphs", "bfs", "strings"]
  },

  // =========================
  // HARD - 25
  // =========================
  {
    title: "Median of Two Sorted Arrays",
    slug: "median-two-sorted-arrays-practice",
    career: "Full Stack Developer",
    topic: "DSA",
    roadmapSkill: "Binary Search",
    difficulty: "Hard",
    description:
      "Find the median of two sorted arrays.",
    inputFormat: "Two sorted arrays.",
    outputFormat: "Median as a number.",
    constraints: ["Arrays are sorted ascending.", "Combined length is at least 1."],
    examples: [
      {
        input: "nums1=[1,3], nums2=[2]",
        output: "2",
        explanation: "Merged order is [1,2,3]."
      },
      {
        input: "nums1=[1,2], nums2=[3,4]",
        output: "2.5",
        explanation: "Middle values are 2 and 3."
      }
    ],
    starterCode: {
      javascript:
        "function findMedianSortedArrays(a, b) {\n  // Write your code here\n}",
      cpp:
        "double findMedianSortedArrays(vector<int>& a, vector<int>& b) {\n    // Write your code here\n}",
      python:
        "def find_median_sorted_arrays(a, b):\n    # Write your code here\n    pass",
      java:
        "static double findMedianSortedArrays(int[] a, int[] b) {\n    // Write your code here\n}"
    },
    testCases: [
      {
        input: "nums1=[1,3], nums2=[2]",
        expectedOutput: "2",
        explanation: "Median is 2.",
        isHidden: false
      },
      {
        input: "nums1=[1,2], nums2=[3,4]",
        expectedOutput: "2.5",
        explanation: "Median is 2.5.",
        isHidden: true
      }
    ],
    tags: ["binary-search", "arrays", "hard"]
  }
];

async function seedCodingQuestions() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("MongoDB URI not found in .env");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected.");

    const existingCount = await CodingQuestion.countDocuments();

    if (existingCount >= 25) {
      console.log(
        `Coding question bank already contains ${existingCount} questions.`
      );
      return;
    }

    const required = 25 - existingCount;

    const existingSlugs = await CodingQuestion.find({})
      .select("slug")
      .lean();

    const existingSlugSet = new Set(
      existingSlugs.map((item) => item.slug)
    );

    const newQuestions = questions
      .filter((question) => !existingSlugSet.has(question.slug))
      .slice(0, required)
      .map((question) => ({
        ...question,
        marks: question.marks || 10,
        isActive: true
      }));

    if (newQuestions.length === 0) {
      console.log("No new questions available to insert.");
      return;
    }

    await CodingQuestion.insertMany(newQuestions);

    const finalCount = await CodingQuestion.countDocuments();

    console.log(`Added ${newQuestions.length} coding questions.`);
    console.log(`Total coding questions now: ${finalCount}`);
  } catch (error) {
    console.error("Coding question seed error:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
}

seedCodingQuestions();