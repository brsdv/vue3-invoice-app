<template>
    <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

* {
    font-family: "Poppins", sans-serif;
    box-sizing: border-box;
    background-color: #141625;
    padding: 0;
    margin: 0;
}

button,
.button {
    cursor: pointer;
    font-size: 12px;
    color: #fff;
    border: none;
    border-radius: 30px;
    padding: 16px 24px;
    margin-right: 8px;
}

.dark-purple {
    background-color: #252945;
}

.red {
    background-color: #ec5757;
}

.purple {
    background-color: #7c5dfa;
}

.green {
    background-color: #33d69f;
}

.orange {
    background-color: #ff8f00;
}

// utility classes
.flex {
    display: flex;
}

.flex-column {
    flex-direction: column;
}

.container {
    width: 100%;
    max-width: 850px;
    padding: 40px 10px;
    margin: 0 auto;

    @media (min-width: 900px) {
        padding-top: 72px;
    }
}

.nav-link {
    text-decoration: none;
    color: initial;
}

// Status Button Styling
.status-button {
    align-items: center;
    font-size: 12px;
    border-radius: 10px;
    padding: 8px 30px;
    margin-right: 30px;

    &::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 8px;
    }
}

.paid {
    color: #33d69f;
    background-color: rgba(51, 214, 160, 0.1);

    &::before {
        background-color: #33d69f;
    }
}

.pending {
    color: #ff8f00;
    background-color: rgba(255, 145, 0, 0.1);

    &::before {
        background-color: #ff8f00;
    }
}

.draft {
    color: #dfe3fa;
    background-color: rgba(223, 227, 250, 0.1);

    &::before {
        background-color: #dfe3fa;
    }
}
</style>
