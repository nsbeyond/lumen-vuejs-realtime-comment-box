<template>
    <div class="panel panel-default">
        <div class="panel-heading"><h3>Home</h3></div>
            <div class="panel-body">
                <router-link :to="{ path: '/' }">Home</router-link>
                <router-link :to="{ path: '/comment' }">Comment</router-link>
            </div>
        </div>
    </div>
</template>