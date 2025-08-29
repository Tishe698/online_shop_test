#!/bin/bash

echo "🚀 Установка Docker для проекта Shop..."

# Определяем операционную систему
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "🐧 Обнаружена Linux система"
    
    # Проверяем, установлен ли Docker
    if ! command -v docker &> /dev/null; then
        echo "📦 Устанавливаем Docker..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sudo sh get-docker.sh
        sudo usermod -aG docker $USER
        echo "✅ Docker установлен. Перезагрузите систему или выполните: newgrp docker"
    else
        echo "✅ Docker уже установлен"
    fi
    
    # Устанавливаем Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        echo "🔧 Устанавливаем Docker Compose..."
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    else
        echo "✅ Docker Compose уже установлен"
    fi
    
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Обнаружена macOS система"
    
    # Проверяем, установлен ли Homebrew
    if ! command -v brew &> /dev/null; then
        echo "📦 Устанавливаем Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    else
        echo "✅ Homebrew уже установлен"
    fi

    # Устанавливаем Docker Engine
    echo "🐳 Устанавливаем Docker Engine..."
    brew install docker

    # Устанавливаем Docker Compose
    echo "🔧 Устанавливаем Docker Compose..."
    brew install docker-compose

    # Устанавливаем Colima (альтернатива Docker Desktop для macOS)
    echo "⚡ Устанавливаем Colima..."
    brew install colima

    # Создаем конфигурацию Docker
    echo "⚙️ Настраиваем Docker..."
    mkdir -p ~/.docker
    echo '{"cliPluginsExtraDirs": ["/opt/homebrew/lib/docker/cli-plugins"]}' > ~/.docker/config.json

    # Запускаем Colima
    echo "🚀 Запускаем Docker через Colima..."
    colima start
else
    echo "❌ Неподдерживаемая операционная система: $OSTYPE"
    echo "📋 Пожалуйста, установите Docker вручную:"
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

echo ""
echo "🎉 Docker успешно установлен!"
echo "📋 Теперь вы можете запустить проект командой:"
echo "   docker-compose up -d"
echo ""
echo "🔍 Проверить статус:"
echo "   docker --version"
echo "   docker-compose --version"
