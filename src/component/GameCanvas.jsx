// src/components/GameCanvas.js
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import characterImage from './donkey.jpg';
import cloudImage from './cloud.jpg';

const GameCanvas = () => {
  const gameRef = useRef(null);
  const gameInstance = useRef(null);

  useEffect(() => {
    if (gameRef.current && !gameInstance.current) {
      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: gameRef.current,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 300 },
            debug: false
          }
        },
        scene: {
          preload: preload,
          create: create,
          update: update
        }
      };

      gameInstance.current = new Phaser.Game(config);

      function preload() {
        this.load.image('character', characterImage);
        this.load.image('cloud', cloudImage);

        this.load.on('complete', () => {
          // All assets are loaded, start the game
          this.scene.start('game');
        });
      }

      function create() {
        this.character = this.physics.add.sprite(100, 100, 'character').setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.text(10, 10, 'Game Loading...', { fontSize: '32px', fill: '#fff' });

        // Log the loaded assets
        console.log('Loaded assets:', this.textures.keys);
    
        this.clouds = this.physics.add.group({
          key: 'cloud',
          repeat: 1,
          setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.physics.add.collider(this.character, this.clouds, hitCloud, null, this);

        this.lives = 3;
        this.text = this.add.text(10, 10, `Lives: ${this.lives}`, { fontSize: '32px', fill: '#fff' }).setScrollFactor(0).setDepth(1);
      }

      function update() {
        if (this.cursors.left.isDown) {
          this.character.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
          this.character.setVelocityX(160);
        } else {
          this.character.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.character.body.touching.down) {
          this.character.setVelocityY(-330);
        }
      }

      function hitCloud(player, cloud) {
        cloud.disableBody(true, true);

        if (player.body.touching.up) {
          // Player jumped on the cloud
          player.setVelocityY(-330);
        } else {
          // Player hit the cloud
          this.lives--;
          this.text.setText(`Lives: ${this.lives}`);

          if (this.lives === 0) {
            // End the game
            this.physics.pause();
            this.text.setText('Game Over');
          }
        }
      }

      return () => {
        gameInstance.current.destroy(true);
      };
    }
  }, [gameRef.current]); // This useEffect hook will run again if gameRef.current changes

  return <canvas ref={gameRef} style={{ width: '800px', height: '600px' }} />;
};

export default GameCanvas;