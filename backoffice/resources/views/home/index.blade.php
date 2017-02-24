@extends('layout.master')
@section('title', 'Vue.js')
@section('content')
<div class="page-container">
    <div class="col-md-offset-2 col-md-8">
        <div class="portlet box white">
            <div id="app">
                <transition name="component-fade" mode="out-in">
                    <router-view class="view"></router-view>
                </transition>
            </div>
        </div>
    </div>
</div>
<style>
</style>
@endsection