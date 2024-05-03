<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">首頁</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink to="/about" class="nav-link">關於我們</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/user/shopping" class="nav-link">產品頁面</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/login" class="nav-link"><i class="bi bi-people"></i></RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
