import pygame
import random
import math
import os

# Initialize Pygame
pygame.init()

# Set up display
WIDTH, HEIGHT = 800, 600
win = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("🐍 Neon Snake Game")

# Load icon images
icon_filenames = ['assets/food1.png', 'assets/food2.png', 'assets/food3.png', 'assets/food4.png']
icons = []
for filename in icon_filenames:
    if os.path.exists(filename):
        icon = pygame.image.load(filename).convert_alpha()
        icon = pygame.transform.scale(icon, (20, 20))
        icons.append(icon)
    else:
        print(f"Warning: {filename} not found.")

# Colors
BLACK = (0, 0, 0)
NEON_GREEN = (57, 255, 20)
WHITE = (255, 255, 255)

# Snake settings
SNAKE_SIZE = 20
SNAKE_SPEED = 15

# Fonts
font_main = pygame.font.SysFont("Courier", 36, bold=True)
font_small = pygame.font.SysFont("Courier", 24)

# Clock
clock = pygame.time.Clock()

def draw_snake(snake_list):
    for x, y in snake_list:
        pygame.draw.rect(win, NEON_GREEN, [x, y, SNAKE_SIZE, SNAKE_SIZE], border_radius=8)

def draw_food(x, y, icon):
    win.blit(icon, (x, y))

def show_score(score):
    value = font_small.render(f"Score: {score}", True, WHITE)
    win.blit(value, [10, 10])

def game_loop():
    game_over = False
    game_close = False

    x1 = WIDTH // 2
    y1 = HEIGHT // 2

    x1_change = 0
    y1_change = 0

    snake_list = []
    length_of_snake = 1

    food_x = round(random.randrange(0, WIDTH - SNAKE_SIZE) / 20.0) * 20.0
    food_y = round(random.randrange(0, HEIGHT - SNAKE_SIZE) / 20.0) * 20.0
    current_icon = random.choice(icons) if icons else None

    while not game_over:

        while game_close:
            win.fill(BLACK)
            msg = font_main.render("Game Over!", True, NEON_GREEN)
            win.blit(msg, [WIDTH / 2 - msg.get_width() / 2, HEIGHT / 3])
            score_msg = font_small.render(f"Your Score: {length_of_snake - 1}", True, WHITE)
            win.blit(score_msg, [WIDTH / 2 - score_msg.get_width() / 2, HEIGHT / 2])
            pygame.display.update()

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    game_over = True
                    game_close = False
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_q:
                        game_over = True
                        game_close = False
                    if event.key == pygame.K_c:
                        game_loop()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT and x1_change == 0:
                    x1_change = -SNAKE_SIZE
                    y1_change = 0
                elif event.key == pygame.K_RIGHT and x1_change == 0:
                    x1_change = SNAKE_SIZE
                    y1_change = 0
                elif event.key == pygame.K_UP and y1_change == 0:
                    x1_change = 0
                    y1_change = -SNAKE_SIZE
                elif event.key == pygame.K_DOWN and y1_change == 0:
                    x1_change = 0
                    y1_change = SNAKE_SIZE

        x1 += x1_change
        y1 += y1_change

        if x1 >= WIDTH or x1 < 0 or y1 >= HEIGHT or y1 < 0:
            game_close = True

        win.fill(BLACK)

        if current_icon:
            draw_food(food_x, food_y, current_icon)
        else:
            pygame.draw.rect(win, WHITE, [food_x, food_y, SNAKE_SIZE, SNAKE_SIZE])

        snake_head = []
        snake_head.append(x1)
        snake_head.append(y1)
        snake_list.append(snake_head)
        if len(snake_list) > length_of_snake:
            del snake_list[0]

        for segment in snake_list[:-1]:
            if segment == snake_head:
                game_close = True

        draw_snake(snake_list)
        show_score(length_of_snake - 1)

        pygame.display.update()

        if x1 == food_x and y1 == food_y:
            food_x = round(random.randrange(0, WIDTH - SNAKE_SIZE) / 20.0) * 20.0
            food_y = round(random.randrange(0, HEIGHT - SNAKE_SIZE) / 20.0) * 20.0
            current_icon = random.choice(icons) if icons else None
            length_of_snake += 1

        clock.tick(SNAKE_SPEED)

    pygame.quit()
    quit()

game_loop()