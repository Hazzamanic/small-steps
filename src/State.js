import Vue from 'vue'

export default new Vue({
    data() {
        return {
            page: 'welcome',
            goals: [],
            selectedCategories: [],
            db: {
                "Categories": [
                    { "CategoryId": 1, "CategoryName": "Personal Hygiene" },
                    { "CategoryId": 2, "CategoryName": "Good Habits" },
                    { "CategoryId": 3, "CategoryName": "Socialising" },
                    { "CategoryId": 4, "CategoryName": "Leaving the House" },
                    { "CategoryId": 5, "CategoryName": "Exercising" },
                    { "CategoryId": 6, "CategoryName": "Observation" },
                    { "CategoryId": 7, "CategoryName": "Health" },
                    { "CategoryId": 8, "CategoryName": "Work" }],
                "Tasks": [
                    { "CategoryId": 1, "TaskId": 2, "TaskDescription": "Brush your teeth" },
                    { "CategoryId": 1, "TaskId": 3, "TaskDescription": "Take a shower" },
                    { "CategoryId": 1, "TaskId": 4, "TaskDescription": "Get a haircut" },
                    { "CategoryId": 1, "TaskId": 5, "TaskDescription": "Shave" },
                    { "CategoryId": 1, "TaskId": 6, "TaskDescription": "Changing out of night clothes" },
                    { "CategoryId": 1, "TaskId": 7, "TaskDescription": "Get out of bed" },
                    { "CategoryId": 1, "TaskId": 8, "TaskDescription": "Clean parts of your accommodation" },
                    { "CategoryId": 1, "TaskId": 9, "TaskDescription": "Wash your clothes" },
                    { "CategoryId": 2, "TaskId": 10, "TaskDescription": "Smile at someone" },
                    { "CategoryId": 2, "TaskId": 11, "TaskDescription": "Practicing smiling while alone" },
                    { "CategoryId": 2, "TaskId": 12, "TaskDescription": "Practice good manners" },
                    { "CategoryId": 2, "TaskId": 13, "TaskDescription": "Talk to someone about how you're feeling" },
                    { "CategoryId": 2, "TaskId": 14, "TaskDescription": "Avoid snoozing your alarm" },
                    { "CategoryId": 2, "TaskId": 15, "TaskDescription": "Read or watch something funny" },
                    { "CategoryId": 3, "TaskId": 16, "TaskDescription": "Answer phone calls and texts" },
                    { "CategoryId": 3, "TaskId": 17, "TaskDescription": "Call someone" },
                    { "CategoryId": 3, "TaskId": 18, "TaskDescription": "Make a plan with a friend or family member" },
                    { "CategoryId": 3, "TaskId": 19, "TaskDescription": "Ask someone serving you a question" },
                    { "CategoryId": 3, "TaskId": 20, "TaskDescription": "Keep a plan with a friend/family member" },
                    { "CategoryId": 4, "TaskId": 21, "TaskDescription": "Go for a walk" },
                    { "CategoryId": 4, "TaskId": 22, "TaskDescription": "Go to the supermarket" },
                    { "CategoryId": 4, "TaskId": 23, "TaskDescription": "Visit the nearest park" },
                    { "CategoryId": 4, "TaskId": 24, "TaskDescription": "Have a drink in a cafe" },
                    { "CategoryId": 5, "TaskId": 25, "TaskDescription": "Practice stretching at home" },
                    { "CategoryId": 5, "TaskId": 26, "TaskDescription": "Do some cardio exercise at home" },
                    { "CategoryId": 5, "TaskId": 27, "TaskDescription": "Visit a gym for a tour" },
                    { "CategoryId": 5, "TaskId": 28, "TaskDescription": "Join a gym" },
                    { "CategoryId": 5, "TaskId": 29, "TaskDescription": "Go for a jog" },
                    { "CategoryId": 5, "TaskId": 30, "TaskDescription": "Practice some resistance training" },
                    { "CategoryId": 5, "TaskId": 31, "TaskDescription": "Take your dog for a walk" },
                    { "CategoryId": 6, "TaskId": 32, "TaskDescription": "Shift your focus outwards" },
                    { "CategoryId": 7, "TaskId": 33, "TaskDescription": "Visit the dentist" },
                    { "CategoryId": 7, "TaskId": 34, "TaskDescription": "Take prescribed medication" },
                    { "CategoryId": 7, "TaskId": 35, "TaskDescription": "Visit a doctor for an ailment" },
                    { "CategoryId": 7, "TaskId": 36, "TaskDescription": "Eat a meal" },
                    { "CategoryId": 7, "TaskId": 37, "TaskDescription": "Avoid taking a nap during the day" },
                    { "CategoryId": 7, "TaskId": 38, "TaskDescription": "Research your condition" },
                    { "CategoryId": 8, "TaskId": 39, "TaskDescription": "Go to work" },
                    { "CategoryId": 8, "TaskId": 40, "TaskDescription": "Engage with your colleagues" }
                ]
            },
        }
    },
    computed: {
        goalsForSelectedCategories() {
            return this.db.Tasks.filter(t => this.selectedCategories.includes(t.CategoryId));
        }
    },
    methods: {
        setPage(name) {
            this.page = name;
        },
        setSelectedCategories(selected) {
            this.selectedCategories = selected;
        },
        addGoal(task) {
            this.goals.push(task)
        }
    }
        
})